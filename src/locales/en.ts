// src/locales/en.ts
export default {
  playlist: {
    library: 'Library',
    createFirstPlaylist: {
      title: 'Create your playlist',
      description: "It's easy, just click the button above.",
    },
    findPodcasts: {
      title: "Let's find some podcasts to follow",
      description: "We'll keep you updated on new episodes.",
    },
    createPlaylist: 'Create',
    playlists: {
      title: 'Playlists',
      errors: {
        loading: 'Error loading playlists:',
      },
      imageAlt: 'Playlist image for {title}',
    },
  },
  header: {
    logoAlt: 'Speautyfayye',
    searchPlaceholder: 'Search',
    login: 'Log in',
    close: 'Close',
    navigation: {
      home: 'Home',
      library: 'Library',
    },
  },
  createPlaylist: {
    title: 'Create New Playlist',
    description: 'Give your playlist a name and start adding your favorite tracks',
    loading: 'Creating...',
    createPlaylist: 'Create Playlist',
    placeholder: 'Enter playlist name...',
  },
  artists: {
    title: 'Popular Artists',
    errors: {
      loading: 'Error loading artists:',
    },
  },
  albums: {
    title: 'Popular Albums',
    errors: {
      loading: 'Error loading albums:',
    },
  },
} as const;
