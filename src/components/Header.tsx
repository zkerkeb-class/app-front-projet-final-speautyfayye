'use client';

import { ModeToggle } from './ModeToggle';
import { useEffect, useState } from 'react';
import { Home, Search, Menu } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-border bg-background p-4">
      <button className="text-foreground lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex items-center gap-4">
        <Link href="/" className="hidden text-foreground hover:text-muted-foreground lg:block">
          <Home className="h-6 w-6" />
        </Link>
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-[200px] rounded-full bg-secondary py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring md:max-w-[300px] lg:max-w-[400px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {mounted ? (
          <>
            <Link
              href="/login"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-muted-foreground sm:px-8 sm:text-base"
            >
              Log in
            </Link>
          </>
        ) : null}
        <ModeToggle />
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="p-4">
            <button className="mb-4 text-foreground" onClick={() => setIsMenuOpen(false)}>
              Close
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-foreground">
                Home
              </Link>
              <Link href="/library" className="text-foreground">
                Library
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
