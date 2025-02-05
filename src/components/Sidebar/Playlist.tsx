'use client';
import { useContext, useEffect } from 'react';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoLibrary } from 'react-icons/io5';
import { trackHistoryContext } from '@/app/providers'

const Playlist = () => {
  const translation = useScopedI18n('playlist');
  const trackHistory = useContext(trackHistoryContext);

  return (
    <div className="h-[calc(88vh-12rem)] w-full space-y-4 bg-neutral-100 pb-3 dark:bg-neutral-800/30">
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex w-full items-center gap-x-3 text-neutral-600 dark:text-neutral-400">
          <IoLibrary className="h-6 w-6" />
          <p className="text-sm font-semibold">{translation('library')}</p>
        </div>
        <div className="ease-in-out-duration-300 flex h-8 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-300/15 dark:text-neutral-300 dark:hover:bg-neutral-700/15">
          <HiOutlinePlus className="text-xl" />
        </div>
      </div>
      <div className="h-full w-full space-y-7 overflow-x-hidden px-2">
        <div className="w-full space-y-5 rounded-md bg-neutral-200 px-5 py-3 dark:bg-neutral-700/40">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-50">
              {translation('createFirstPlaylist.title')}
            </h6>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-100">
              {translation('createFirstPlaylist.description')}
            </p>
          </div>
          <button className="h-8 w-fit rounded-full bg-neutral-900 px-4 text-sm font-semibold text-neutral-50 duration-100 ease-in-out hover:scale-105 dark:bg-neutral-50 dark:text-neutral-950">
            <Link href="/createPlaylist">{translation('createPlaylist')}</Link>
          </button>
        </div>  
 
        <p>
          {trackHistory.trackHistory.map((track) => (
            <div key={track.id}>
              <li>{track.title} - {typeof track.artist === 'string' ? track.artist : track.artist?.name}</li>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Playlist;
