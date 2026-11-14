// Backend lokal untuk LearnCode: seluruh data disimpan di localStorage browser.
// Antarmukanya meniru SDK sebelumnya (auth.* dan entities.*.list/filter/get/create/update/delete)
// sehingga halaman dan hook tidak perlu tahu bahwa tidak ada server.
//
// CATATAN: ini untuk demo/tugas. Password disimpan apa adanya di browser dan tidak aman
// untuk dipakai sungguhan.

const DB_KEY = 'learncode.db.v1';
const USERS_KEY = 'learncode.users.v1';
const SESSION_KEY = 'learncode.session.v1';

const ENTITIES = ['LearnerProfile', 'LessonProgress', 'QuizAttempt'];

export const DEMO_ACCOUNT = { email: 'demo@learncode.dev', password: 'demo1234' };

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const apiError = (message, status) => Object.assign(new Error(message), { status });

// ---------- data awal ----------

const DEMO_LEARNERS = [
  ['Aiko Tanaka', 'aiko', 4120, 640, 21],
  ['Rafi Pratama', 'rafi', 3480, 520, 14],
  ['Maya Lestari', 'maya', 2950, 710, 18],
  ['Daniel Kim', 'danielk', 2310, 280, 9],
  ['Sofia Rossi', 'sofia', 1780, 330, 6],
  ['Budi Santoso', 'budis', 1210, 150, 4],
  ['Nina Patel', 'ninap', 760, 120, 3],
  ['Leo Martin', 'leom', 340, 60, 1],
];

function seedDb() {
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  return {
    LearnerProfile: DEMO_LEARNERS.map(([display_name, username, xp, week_xp, streak], i) => ({
      id: `demo-profile-${i + 1}`,
      user_id: `demo-user-${i + 1}`,
      display_name,
      username,
      bio: '',
      xp,
      week_xp,
      streak,
      best_streak: streak,
      last_active_date: today,
      daily_goal_minutes: 15,
      unlocked: [],
      is_demo: true,
      created_date: now,
      updated_date: now,
      created_by: `demo-user-${i + 1}`,
    })),
    LessonProgress: [],
    QuizAttempt: [],
  };
}

function loadDb() {
  const db = read(DB_KEY, null);
  if (db) return db;
  const fresh = seedDb();
  write(DB_KEY, fresh);
  return fresh;
}

function loadUsers() {
  const users = read(USERS_KEY, null);
  if (users) return users;
  const seeded = [
    {
      id: 'demo-account',
      email: DEMO_ACCOUNT.email,
      password: DEMO_ACCOUNT.password,
      full_name: 'Demo Learner',
      role: 'admin',
      created_date: new Date().toISOString(),
    },
  ];
  write(USERS_KEY, seeded);
  return seeded;
}

const publicUser = ({ password: _password, ...user }) => user;

// ---------- auth ----------

const currentUser = () => {
  const id = window.localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  const user = loadUsers().find((u) => u.id === id);
  return user ? publicUser(user) : null;
};

const auth = {
  /** Sinkron: user yang sedang login atau null. */
  current: currentUser,

  async me() {
    const user = currentUser();
    if (!user) throw apiError('Authentication required', 401);
    return user;
  },

  async isAuthenticated() {
    return currentUser() !== null;
  },

  async register({ email, password, full_name }) {
    const clean = String(email || '').trim().toLowerCase();
    if (!clean || !password) throw apiError('Email and password are required', 400);
    if (String(password).length < 6) throw apiError('Password must be at least 6 characters', 400);
    const users = loadUsers();
    if (users.some((u) => u.email === clean)) throw apiError('An account with this email already exists', 409);
    const user = {
      id: newId(),
      email: clean,
      password,
      full_name: String(full_name || '').trim() || clean.split('@')[0],
      role: 'user',
      created_date: new Date().toISOString(),
    };
    write(USERS_KEY, [...users, user]);
    window.localStorage.setItem(SESSION_KEY, user.id);
    return publicUser(user);
  },

  async login({ email, password }) {
    const clean = String(email || '').trim().toLowerCase();
    const user = loadUsers().find((u) => u.email === clean && u.password === password);
    if (!user) throw apiError('Invalid email or password', 401);
    window.localStorage.setItem(SESSION_KEY, user.id);
    return publicUser(user);
  },

  logout(redirectTo) {
    window.localStorage.removeItem(SESSION_KEY);
    if (redirectTo) window.location.href = redirectTo;
  },

  async updateMe(patch) {
    const user = currentUser();
    if (!user) throw apiError('Authentication required', 401);
    const { id: _id, role: _role, password: _pw, ...safe } = patch || {};
    const users = loadUsers().map((u) => (u.id === user.id ? { ...u, ...safe } : u));
    write(USERS_KEY, users);
    return publicUser(users.find((u) => u.id === user.id));
  },
};

// ---------- entities ----------

const sortRecords = (records, sort) => {
  const field = (sort || '-created_date').replace(/^-/, '');
  const dir = String(sort || '-created_date').startsWith('-') ? -1 : 1;
  // Urutan awal = urutan penyimpanan; dibalik dulu supaya yang terbaru menang saat nilainya sama.
  return [...records]
    .map((record, index) => ({ record, index }))
    .sort((a, b) => {
      const av = a.record[field];
      const bv = b.record[field];
      if (av === bv || (av == null && bv == null)) return dir * (a.index - b.index);
      if (av == null) return 1;
      if (bv == null) return -1;
      return av > bv ? dir : -dir;
    })
    .map((x) => x.record);
};

const matches = (record, query) => Object.entries(query || {}).every(([key, value]) => record[key] === value);

function makeEntity(name) {
  const all = () => loadDb()[name] || [];
  const save = (records) => write(DB_KEY, { ...loadDb(), [name]: records });

  return {
    async list(sort, limit) {
      const sorted = sortRecords(all(), sort);
      return limit ? sorted.slice(0, limit) : sorted;
    },

    async filter(query, sort, limit) {
      const sorted = sortRecords(all().filter((r) => matches(r, query)), sort);
      return limit ? sorted.slice(0, limit) : sorted;
    },

    async get(id) {
      const record = all().find((r) => r.id === id);
      if (!record) throw apiError(`${name} not found`, 404);
      return record;
    },

    async create(data) {
      const user = currentUser();
      const now = new Date().toISOString();
      const record = { ...data, id: newId(), created_date: now, updated_date: now, created_by: user?.id || null };
      save([...all(), record]);
      return record;
    },

    async update(id, patch) {
      let updated = null;
      const records = all().map((r) => {
        if (r.id !== id) return r;
        updated = { ...r, ...patch, id: r.id, updated_date: new Date().toISOString() };
        return updated;
      });
      if (!updated) throw apiError(`${name} not found`, 404);
      save(records);
      return updated;
    },

    async delete(id) {
      save(all().filter((r) => r.id !== id));
      return { success: true };
    },
  };
}

export const api = {
  auth,
  entities: Object.fromEntries(ENTITIES.map((name) => [name, makeEntity(name)])),
  /** Hapus semua data lokal (akun, sesi, progres) lalu mulai dari data awal. */
  resetAll() {
    [DB_KEY, USERS_KEY, SESSION_KEY].forEach((key) => window.localStorage.removeItem(key));
  },
};
