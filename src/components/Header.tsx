'use client';

import { ModeToggle } from './ModeToggle';
import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScopedI18n } from '@/locales/client';
import { LocaleSelect } from './LocaleSelect';
import { useRouter } from 'next/navigation'; // Importez useRouter

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // État pour stocker la recherche
  const translation = useScopedI18n('header');
  const router = useRouter(); // Initialisez useRouter

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`); // Rediriger vers la page de recherche
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-border bg-background p-4">
      <div className="flex items-center gap-4">
        <button className="text-foreground lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="hidden text-foreground hover:text-muted-foreground lg:block">
          <Image src="/logo.png" alt={translation('logoAlt')} width={65} height={65} />
        </Link>
      </div>

      <div className="mx-auto flex max-w-2xl flex-1 justify-center px-4">
        <form onSubmit={handleSearch} className="relative flex w-full items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={translation('searchPlaceholder')}
            className="w-full rounded-full bg-secondary py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={searchQuery} // Lier la valeur de l'input à l'état
            onChange={(e) => setSearchQuery(e.target.value)} // Mettre à jour l'état
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <LocaleSelect />
        {/* <Link
          href="/login"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-muted-foreground sm:px-8 sm:text-base"
        >
          {translation('login')}
        </Link> */}
        <ModeToggle />
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="p-4">
            <button className="mb-4 text-foreground" onClick={() => setIsMenuOpen(false)}>
              {translation('close')}
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                {translation('navigation.home')}
              </Link>
              <Link
                href="/library"
                className="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {translation('navigation.library')}
              </Link>
              <ModeToggle />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
