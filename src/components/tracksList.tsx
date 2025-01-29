import { playerContext, trackContext } from '@/app/providers';
import { formatDuration } from '@/constants/data';
import { IArtist } from '@/models/artist.model';
import { IPlaylist } from '@/models/playlist';
import { ITrackExt } from '@/models/track';
import { getPlaylists } from '@/services/playlists';
import { EllipsisVertical, Minus, Pause, Play, Plus } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

interface IProps {
  tracks: ITrackExt[];
  onClick: (track: ITrackExt) => void;
  deletable?: boolean;
  entityId?: number;
}

export default function TracksList(props: IProps) {
  const audio = useContext(trackContext);
  const player = useContext(playerContext);

  const [optionsOpen, setOptionsOpen] = useState<number | undefined>(undefined);
  const [addToPlaylistOpen, setAddToPlaylistOpen] = useState<number | undefined>(undefined);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    if (addToPlaylistOpen) {
      fetchPlaylists();
    }
  }, [addToPlaylistOpen]);

  const fetchPlaylists = async () => {
    try {
      const fetchedPlaylists = await getPlaylists();
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error(error);
    }
  };

  const addToPlaylist = async (playlistId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/playlist/${playlistId}/track`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackId: addToPlaylistOpen }),
        },
      );
      switch (response.status) {
        case 409:
          alert('Ce morceau est déjà dans cette playlist.');
          break;
        case 200:
        case 201:
          alert('Morceau ajouté à la playlist.');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromPlaylist = async () => {
    if (!props.deletable) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/playlist/${props.entityId}/track`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackId: optionsOpen }),
        },
      );
      switch (response.status) {
        case 404:
          alert("Ce morceau n'est pas dans cette playlist.");
          break;
        case 200:
          alert('Morceau supprimé de la playlist.');
          window.location.reload();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-1">
        {props.tracks.map((track, i) => (
          <div className="flex items-center" key={i}>
            <div
              onClick={() => props.onClick(track)}
              className={`group relative flex grow cursor-pointer items-center rounded-md px-3 py-2.5 transition hover:bg-white/10 sm:px-4 sm:py-3 ${
                audio.track?.id === track.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-x-3 sm:gap-x-6">
                  <div className="relative w-5 sm:w-6">
                    <span
                      className={`absolute -top-2 text-sm text-neutral-400 group-hover:opacity-0 sm:text-base ${
                        audio.track?.id === track.id ? 'opacity-0' : ''
                      }`}
                    >
                      {track.trackNumber.toString().padStart(2, '0')}
                    </span>
                    <div
                      className={`absolute -top-2 text-green-500 opacity-0 group-hover:opacity-100 ${
                        audio.track?.id === track.id ? 'opacity-100' : ''
                      }`}
                    >
                      {audio.track?.id === track.id && player.isPlaying ? (
                        <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p
                      className={`truncate text-sm sm:text-base ${
                        audio.track?.id === track.id
                          ? 'text-green-500'
                          : 'text-neutral-900 group-hover:text-green-400 dark:text-white'
                      }`}
                    >
                      {track.title}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`truncate text-sm sm:text-base ${
                        audio.track?.id === track.id
                          ? 'text-green-500'
                          : 'text-neutral-900 group-hover:text-green-400 dark:text-white'
                      }`}
                    >
                      {(track.artist as IArtist)?.name ?? 'Artiste inconnu'}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 group-hover:text-white sm:text-sm">
                  {formatDuration(Number(track.duration))}
                </div>
              </div>
            </div>
            <div className="relative">
              <EllipsisVertical
                className="cursor-pointer"
                onClick={() => setOptionsOpen(track.id)}
              />
              {optionsOpen === track.id && (
                <div className="absolute bottom-full right-full z-20 space-y-2 border bg-black p-3">
                  {addToPlaylistOpen === track.id ? (
                    playlists.map((playlist, j) => (
                      <p
                        key={j}
                        className="cursor-pointer whitespace-nowrap py-1 text-sm hover:text-green-500"
                        onClick={() => addToPlaylist(playlist.id)}
                      >
                        {playlist.title}
                      </p>
                    ))
                  ) : (
                    <>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Plus size={15} color="green" />
                        <p
                          className="whitespace-nowrap text-sm hover:text-green-500"
                          onClick={() => setAddToPlaylistOpen(track.id)}
                        >
                          Ajouter à une playlist
                        </p>
                      </div>
                      {props.deletable && (
                        <div className="flex cursor-pointer items-center gap-2">
                          <Minus size={15} color="red" />
                          <p
                            className="whitespace-nowrap text-sm hover:text-red-500"
                            onClick={() => deleteFromPlaylist()}
                          >
                            Supprimer de la playlist
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {optionsOpen !== undefined ? (
        <div
          onClick={() => {
            setOptionsOpen(undefined);
            setAddToPlaylistOpen(undefined);
            setPlaylists([]);
          }}
          className="absolute inset-0 z-10 h-screen w-screen"
        ></div>
      ) : (
        ''
      )}
    </>
  );
}
