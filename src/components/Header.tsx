'use client';

import { ModeToggle } from './ModeToggle';
import { useState } from 'react';
import { Home, Search, Menu } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-border bg-background p-4">
      {/* Section gauche */}
      <div className="flex items-center gap-4">
        <button className="text-foreground lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="hidden text-foreground hover:text-muted-foreground lg:block">
          <Home className="h-6 w-6" />
        </Link>
      </div>

      {/* Section centrale - Search */}
      <div className="mx-auto flex max-w-2xl flex-1 justify-center px-4">
        <div className="relative flex w-full items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-secondary py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Section droite */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/login"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-muted-foreground sm:px-8 sm:text-base"
        >
          Log in
        </Link>
        <ModeToggle />
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="p-4">
            <button className="mb-4 text-foreground" onClick={() => setIsMenuOpen(false)}>
              Close
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/library"
                className="text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Library
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
