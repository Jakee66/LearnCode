
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={language === 'en' ? 'font-bold text-primary' : ''}
      >
        🇬🇧 EN
      </button>

      <button
        onClick={() => changeLanguage('id')}
        className={language === 'id' ? 'font-bold text-primary' : ''}
      >
        🇮🇩 ID
      </button>
    </div>
  );
}
