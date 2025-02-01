'use client';

export const fetchAudio = async (trackId: number) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/audio/${trackId}`;

  const response = await fetch(url, { method: 'GET' });

  if (response.ok) {
    const durationHeader = response.headers.get('duration');
    const durationInSeconds = durationHeader ? parseInt(durationHeader, 10) : 0;

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    return { durationInSeconds, objectUrl };
  } else {
    console.error('Erreur lors de la récupération du fichier audio');
  }
};
