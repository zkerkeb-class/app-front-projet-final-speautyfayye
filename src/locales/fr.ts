// locales/fr.ts
export default {
  playlist: {
    library: 'Bibliothèque',
    createFirstPlaylist: {
      title: 'Créez votre playlist',
      description: "C'est facile, cliquez simplement sur le bouton ci-dessus.",
    },
    findPodcasts: {
      title: 'Trouvons quelques podcasts à suivre',
      description: 'Nous vous tiendrons au courant des nouveaux épisodes.',
    },
    createPlaylist: 'Créer',
    playlists: {
      title: 'Listes de lecture',
      errors: {
        loading: 'Erreur lors du chargement des playlists :',
      },
      imageAlt: 'Image de la playlist {title}',
    },
  },
  header: {
    logoAlt: 'Speautyfayye',
    searchPlaceholder: 'Rechercher',
    login: 'Se connecter',
    close: 'Fermer',
    navigation: {
      home: 'Accueil',
      library: 'Bibliothèque',
    },
  },
  createPlaylist: {
    title: 'Créer une nouvelle playlist',
    description: 'Donnez un nom à votre playlist et commencez à ajouter vos favoris',
    loading: 'Création...',
    createPlaylist: 'Créer une playlist',
    placeholder: 'Entrez le nom de la playlist...',
  },
  artists: {
    title: 'Artistes Populaires',
    errors: {
      loading: 'Erreur lors du chargement des artistes :',
    },
  },
  albums: {
    title: 'Albums Populaires',
    errors: {
      loading: 'Erreur lors du chargement des albums :',
    },
  },
  searchPage: {
    error: 'Erreur lors de la recherche :',
    results: 'Résultats pour {query}',
    resultsCount: '{count} résultats',
    tracks: 'Pistes',
    albums: 'Albums',
    artists: 'Artistes',
    playlists: 'Playlists',
    categories: 'Catégories',
    duration: 'Durée :',
    artist: 'Artiste',
    album: 'Album',
    category: 'Catégorie',
    playlist: 'Playlist',
    track: 'Piste',
    releaseDate: 'Sortie le {releaseDate}',
    day: 'Jour',
    month: 'Mois',
    year: 'Année',
    noResults: 'Aucun résultat trouvé pour &quot;{query}&quot;',
    sortBy: 'Trier par :',
    durationText: 'Durée',
    releaseDateText: 'Date de sortie',
    alphabeticText: 'Alphabétique',
    popularityText: 'Popularité',
  },
} as const;
