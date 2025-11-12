import { useState, Suspense } from 'react';
import logo from './esal_logo_blk.png';
import './App.css';
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/main.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('English');
  const [sessionActive, setSessionActive] = useState(false);

  const onChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    setLanguage(selectedLang === 'en' ? 'English' : 'Spanish');
  };

  const handleStart = () => {
    setSessionActive(true);
  };

  const handleEnd = () => {
    setSessionActive(false);
  };

  return (
    <Suspense fallback="Loading...">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{t('welcomeMessage')}</h1>
          <p>{t('introText')}</p>

          <div style={{ margin: '20px' }}>
            {!sessionActive ? (
              <button onClick={handleStart}>{t('startButton')}</button>
            ) : (
              <button onClick={handleEnd}>{t('endButton')}</button>
            )}
          </div>

          <p id="session-status">
            {sessionActive ? t('sessionActive') : t('sessionInactive')}
          </p>

          <p id="language-text">
            {t('languageStatus')} <strong>{language}</strong>.
          </p>

          <select name="language" onChange={onChange}>
            <option value="en">{t('english')}</option>
            <option value="es">{t('spanish')}</option>
          </select>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
