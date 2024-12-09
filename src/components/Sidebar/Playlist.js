import { IoLibrary } from 'react-icons/io5';
import { HiOutlinePlus } from 'react-icons/hi';

const Playlist = () => {
  return (
    <div className="h-[calc(88vh-12rem)] w-full space-y-4 bg-neutral-800/30 pb-3">
      <div className="justify between flex w-full items-center px-6 py-3">
        <div className="flex w-full items-center gap-x-3 text-neutral-400">
          <IoLibrary className="h-6 w-6" />
          <p className="text-sm font-semibold">Bibliothèque</p>
        </div>
        <div className="ease-in-out-duration-300 flex h-8 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-700/15">
          <HiOutlinePlus className="text-xl" />
        </div>
      </div>
      <div className="h-full w-full space-y-7 overflow-x-hidden px-2">
        <div className="w-full space-y-5 rounded-md bg-neutral-700/40 px-5 py-3">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold tracking-wide text-neutral-50">
              Créez votre première playlist
            </h6>
            <p className="text-xs font-medium text-neutral-100">
              C&apos;est facile, cliquez simplement sur le bouton ci-dessus.
            </p>
          </div>
          <button className="h-8 w-fit rounded-full bg-neutral-50 px-4 text-sm font-semibold text-neutral-950 duration-100 ease-in-out hover:scale-105">
            Créer une playlist
          </button>
        </div>
        <div className="w-full space-y-5 rounded-md bg-neutral-700/40 px-5 py-3">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold tracking-wide text-neutral-50">
              Trouvons quelques podcasts à suivre
            </h6>
            <p className="text-xs font-medium text-neutral-100">
              Nous vous tiendrons au courant des nouveaux épisodes.
            </p>
          </div>
          <button className="h-8 w-fit rounded-full bg-neutral-50 px-4 text-sm font-semibold text-neutral-950 duration-100 ease-in-out hover:scale-105">
            Créer une playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
