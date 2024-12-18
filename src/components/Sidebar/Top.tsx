import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa6';
import { GoHomeFill, GoSearch } from 'react-icons/go';

const Top = () => {
  return (
    <div className="h-40 w-full space-y-5 rounded-md bg-neutral-100 px-6 py-5 dark:bg-neutral-800/30">
      <Link href="/" className="flex items-center gap-x-0.5 text-neutral-900 dark:text-neutral-50">
        <FaSpotify className="h-6 w-6" />
        <p className="text-base font-medium tracking-tight">Speautyfayye</p>
      </Link>
      <Link href="" className="flex items-center gap-x-0.5 text-neutral-900 dark:text-neutral-50">
        <GoHomeFill className="h-6 w-6" />
        <p className="text-base font-medium">Accueil</p>
      </Link>
      <Link href="" className="flex items-center gap-x-0.5 text-neutral-600 dark:text-neutral-400">
        <GoSearch className="h-6 w-6" />
        <p className="text-base font-medium">Rechercher</p>
      </Link>
    </div>
  );
};

export default Top;
