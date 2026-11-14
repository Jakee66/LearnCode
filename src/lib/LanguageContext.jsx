
import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {'en' | 'id'} Language
 * @typedef {{
 *   language: Language,
 *   changeLanguage: (lang: Language) => void,
 *   t: (key: string) => string
 * }} LanguageContextValue
 */

/** @type {React.Context<LanguageContextValue | null>} */
const LanguageContext = createContext(null);

const translations = {
  en: {
    language: 'Language',
    settings: 'Settings',
    settingsSubtitle: 'Your account and app preferences',
    account: 'Account',
    profileDetails: 'Profile details',
    signedInAs: 'Signed in as',
    notifications: 'Notifications',
    streakReminder: 'Daily streak reminder',
    streakDesc: 'A nudge if your streak is about to break',
    newCourses: 'New courses',
    newCoursesDesc: 'When a language or module is added',
    badges: 'Badge celebrations',
    badgesDesc: 'Confetti sounds and animations',
    appearance: 'Appearance',
    more: 'More',
    privacy: 'Privacy policy',
    terms: 'Terms & conditions',
    logout: 'Log out',
    close: 'Close',
    home: 'Home',
    learn: 'Learn',
    practice: 'Practice',
    rank: 'Rank',
    profile: 'Profile',
  },

  id: {
    language: 'Bahasa',
    settings: 'Pengaturan',
    settingsSubtitle: 'Akun dan preferensi aplikasi kamu',
    account: 'Akun',
    profileDetails: 'Detail Profil',
    signedInAs: 'Masuk sebagai',
    notifications: 'Notifikasi',
    streakReminder: 'Pengingat streak harian',
    streakDesc: 'Pengingat jika streak kamu hampir terputus',
    newCourses: 'Kursus baru',
    newCoursesDesc: 'Ketika bahasa atau modul baru ditambahkan',
    badges: 'Perayaan lencana',
    badgesDesc: 'Suara konfeti dan animasi',
    appearance: 'Tampilan',
    more: 'Lainnya',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat & Ketentuan',
    logout: 'Keluar',
    close: 'Tutup',
    home: 'Beranda',
    learn: 'Belajar',
    practice: 'Latihan',
    rank: 'Peringkat',
    profile: 'Profil',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'en';
  });

  const changeLanguage = (lang) => {
    if (!translations[lang]) return;

    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** @returns {LanguageContextValue} */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}