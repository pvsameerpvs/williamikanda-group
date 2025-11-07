"use client";
import { useI18n } from '@/lib/i18n';

export function LanguageSwitch(){
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={()=>setLang('en')}
        className={`px-3 py-1 rounded-full border ${lang==='en' ? 'border-gold' : 'border-black/10 dark:border-white/10'}`}
        aria-pressed={lang==='en'}
      >EN</button>
      <button
        onClick={()=>setLang('ar')}
        className={`px-3 py-1 rounded-full border ${lang==='ar' ? 'border-gold' : 'border-black/10 dark:border-white/10'}`}
        aria-pressed={lang==='ar'}
      >العربية</button>
    </div>
  );
}
