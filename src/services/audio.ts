'use client';

export const fetchAudio = async (trackId: number) => {
  const url = `http://localhost:3001/audio/${trackId}`;

  const response = await fetch(url, { method: 'GET' });

  if (response.ok) {
    const durationHeader = response.headers.get('duration');
    const durationInSeconds = durationHeader ? parseInt(durationHeader, 10) : 0;

    const newBlob = await response.blob();
    const objectUrl = URL.createObjectURL(newBlob);

    return { durationInSeconds, objectUrl };
  } else {
    console.error('Erreur lors de la récupération du fichier audio');
  }
};
