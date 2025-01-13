export const defaultAlbumImages = [
  'https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/01/16/16/48/adult-3086307_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/08/31/20/47/concert-7424190_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/12/27/14/29/vinyl-4722544_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/04/15/09/47/men-723557_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/01/16/16/46/adult-3086302_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/09/05/21/45/record-store-925553_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/11/02/05/56/music-5705801_1280.jpg',
];

export const defaultArtistImages = [
  'https://cdn.pixabay.com/photo/2019/08/21/14/42/street-artists-4421219_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/07/06/13/23/drummers-7305157_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/19/21/05/bass-guitar-1841186_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/02/26/19/51/guitar-8598823_640.jpg',
  'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/23/18/05/concert-1854113_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/05/06/12/17/music-7974197_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/08/01/14/51/concert-2566002_1280.jpg',
  'https://cdn.pixabay.com/photo/2014/11/21/16/43/singer-540771_1280.jpg',
];

export const defaultPlaylistImages = [
  'https://cdn.pixabay.com/photo/2024/10/17/13/19/ai-generated-9127632_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/08/07/22/43/technology-2608742_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/08/06/12/54/headphones-2592263_1280.jpg',
];

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
