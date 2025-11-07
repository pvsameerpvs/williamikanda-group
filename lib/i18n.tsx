"use client";
import React, {createContext, useContext, useState, useEffect} from 'react';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

type Dict = typeof en;
type Lang = 'en' | 'ar';

const dictMap: Record<Lang, Dict> = { en, ar };

type Ctx = {
  t: Dict;
  lang: Lang;
  setLang: (l: Lang) => void;
};

const I18nContext = createContext<Ctx>({ t: en, lang: 'en', setLang: () => {} });

export function I18nProvider({children}: {children: React.ReactNode}) {
  const [lang, setLang] = useState<Lang>('en');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') as Lang : null;
    if (saved) setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);
  const value: Ctx = { t: dictMap[lang], lang, setLang };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
