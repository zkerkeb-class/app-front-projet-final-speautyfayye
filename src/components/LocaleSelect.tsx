'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Globe } from 'lucide-react'; // Import de l'icône Globe

export const LocaleSelect = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <div className="relative inline-block">
      <div className="flex items-center">
        <Globe className="absolute left-2 h-4 w-4 text-muted-foreground" />
        <select
          name="locale"
          id="locale"
          value={locale}
          onChange={(e) => changeLocale(e.target.value as 'en' | 'fr' | 'ar')}
          className="h-9 appearance-none rounded-md bg-secondary pl-8 pr-8 text-sm font-medium text-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="en" className="text-foreground">
            English
          </option>
          <option value="fr" className="text-foreground">
            Français
          </option>
          <option value="ar" className="text-foreground">
            العربية
          </option>
        </select>
        <div className="pointer-events-none absolute right-2 flex items-center">
          <svg
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
