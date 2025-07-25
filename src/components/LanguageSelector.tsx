import React from 'react';
import { Select } from 'antd';
import appStore from '../stores/AppStore';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const { Option } = Select;

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'kr', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

const LanguageSelector: React.FC = observer(() => {
  const { i18n } = useTranslation();
  const { lang } = appStore.state;

  const handleChange = (value: string) => {
    appStore.setLang(value as 'en' | 'ko' | 'ja');
    i18n.changeLanguage(value);
  };

  const renderOption = (lang: (typeof LANGUAGES)[0]) => (
    <Option key={lang.code} value={lang.code}>
      <span role="img" aria-label={lang.label} style={{ marginRight: 8 }}>
        {lang.flag}
      </span>
      {lang.label}
    </Option>
  );

  return (
    <Select value={lang} onChange={handleChange} style={{ width: 110 }}>
      {LANGUAGES.map(renderOption)}
    </Select>
  );
});

export default LanguageSelector;
