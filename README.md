# LearnCode

Aplikasi belajar coding bergaya game: pelajaran, kuis, XP, streak, badge, dan leaderboard.

Berjalan sepenuhnya di browser — **tanpa server, tanpa akun layanan apa pun**. Data (akun, progres, hasil kuis) disimpan di `localStorage` browser lewat `src/api/client.js`.

## Menjalankan

Butuh Node.js 20.19+ (atau 22.12+).

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Akun demo

- Email: `demo@learncode.dev`
- Password: `demo1234`

Atau daftar akun baru lewat halaman Register (tersimpan hanya di browser ini).

Untuk mengembalikan data ke kondisi awal, hapus data situs (localStorage) di browser, atau jalankan `localStorage.clear()` di console.

## Build

```bash
npm run build
npm run preview
```

## Struktur singkat

- `src/api/client.js` — backend lokal (auth + entitas LearnerProfile, LessonProgress, QuizAttempt) beserta data demo
- `src/data/curriculum.js` — materi kursus, kuis, dan badge
- `src/pages/` — halaman aplikasi
- `src/lib/AuthContext.jsx` — state login

> Catatan: password pada akun lokal disimpan apa adanya di localStorage; ini hanya untuk demo/tugas, bukan untuk produksi.
