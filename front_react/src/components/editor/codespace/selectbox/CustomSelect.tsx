import React, { useState } from 'react';
import styles from './select.module.css';

interface LanguageOptions {
  [key: string]: { value: string };
}

interface CustomSelectProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  languageOptions: LanguageOptions;
  setCode: (code: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ language, setLanguage, languageOptions, setCode }) => {
  const [isClick, setIsClick] = useState(false);

  const handleOnChangeSelectValue = (value: string) => {
    setLanguage(value);
    setCode(languageOptions[value].value);
    setIsClick(false);
  };

  return (
    <div className={styles.select} onClick={() => setIsClick(!isClick)}>
      <div className={styles.selected}>
        <div className={styles.label}>{language}</div>
        {isClick ? (
          <img className={styles.btn} src='' alt='up' />
        ) : (
          <img className={styles.btn} src='' alt='down' />
        )}
      </div>
      <div className={styles.option_container} style={{ display: isClick ? 'block' : 'none' }}>
        {Object.keys(languageOptions).map((lang) => (
          <div
            key={lang}
            className={styles.option}
            onClick={() => handleOnChangeSelectValue(lang)}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
