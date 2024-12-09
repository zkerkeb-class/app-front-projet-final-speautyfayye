'use client';
// import React, { useState } from 'react';

const Player = () => {
  // const [volume, setVolume] = useState(0.5);

  // const handleVolume = (e) => {
  //   const volumeBar = e.target.value;
  //   const newVolume = e.nativeEvent.offsetX / volumeBar.offsetWidth;
  //   setVolume(newVolume);
  // };

  return (
    <div className="grid-cold-2 absolute bottom-0 left-0 grid w-full rounded-md px-2 md:grid-cols-4">
      {/* Artist, Img, song, name */}
      <h1>Player</h1>
      <div className="col-span-1 hidden items-center gap-x-3.5 md:flex"></div>
      {/* Player controls */}

      {/* Volume control */}
      <div className="col-span-1 hidden w-full items-center justify-end gap-x-3 md:flex"></div>
    </div>
  );
};

export default Player;

// 11:04
