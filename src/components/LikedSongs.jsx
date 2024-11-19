import React from 'react';
import { useLikedSongs } from '../hooks/useLocalStorage';
import { useMusic } from '../context/MusicContext';

function LikedSongs() {
  const { likedSongs, removeLikedSong } = useLikedSongs();
  const { setCurrentTrack, currentTrack, isPlaying, togglePlay } = useMusic();

  const handlePlay = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="ml-64 p-8 bg-gradient-to-b from-purple-900 to-spotify-black min-h-screen">
      <div className="flex items-center mb-8">
        <div className="w-60 h-60 bg-gradient-to-br from-purple-700 to-purple-900 mr-6 shadow-lg flex items-center justify-center">
          <i className="fas fa-heart text-6xl text-white"></i>
        </div>
        <div>
          <p className="uppercase text-xs text-gray-400 font-bold">Playlist</p>
          <h1 className="text-7xl font-bold text-white mt-2 mb-6">Liked Songs</h1>
          <p className="text-gray-400">{likedSongs.length} songs</p>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full text-left text-gray-400">
          <thead>
            <tr className="border-b border-gray-800 text-sm">
              <th className="pb-3 w-8">#</th>
              <th className="pb-3">TITLE</th>
              <th className="pb-3">ARTIST</th>
              <th className="pb-3">ALBUM</th>
              <th className="pb-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((track, index) => (
              <tr key={track.id} className="hover:bg-white hover:bg-opacity-10 group">
                <td className="py-4">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    onClick={() => handlePlay(track)}
                    className="hidden group-hover:block text-white hover:text-spotify-green focus:outline-none"
                  >
                    <i className={`fas ${currentTrack?.id === track.id && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                  </button>
                </td>
                <td>
                  <div className="flex items-center">
                    <img 
                      src={track.albumArt} 
                      alt={track.title} 
                      className="w-10 h-10 mr-3"
                    />
                    <span className="text-white">{track.title}</span>
                  </div>
                </td>
                <td>{track.artist}</td>
                <td>{track.album}</td>
                <td>
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => removeLikedSong(track.id)}
                      className="text-white hover:text-red-500 focus:outline-none"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      onClick={() => removeLikedSong(track.id)}
                      className="text-white hover:text-red-500 focus:outline-none"
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LikedSongs;
