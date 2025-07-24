import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Loading translation files
import en from './locales/en.json';
import kr from './locales/kr.json';

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      kr: { translation: kr },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
