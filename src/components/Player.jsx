import React from 'react';
import { useMusic } from '../context/MusicContext';
import { useLikedSongs } from '../hooks/useLocalStorage';

function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    volume,
    currentTime,
    duration,
    togglePlay,
    setVolume,
    seekTo,
    playNext,
    playPrevious
  } = useMusic();
  
  const { isLiked, addLikedSong, removeLikedSong } = useLikedSongs();

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (e) => {
    seekTo(parseFloat(e.target.value));
  };

  const handleLikeToggle = () => {
    if (currentTrack) {
      if (isLiked(currentTrack.id)) {
        removeLikedSong(currentTrack.id);
      } else {
        addLikedSong(currentTrack);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-black border-t border-gray-800 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center w-1/4">
          {currentTrack && (
            <>
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.title}
                className="h-14 w-14 rounded mr-3"
              />
              <div>
                <div className="text-white text-sm">{currentTrack.title}</div>
                <div className="text-gray-400 text-xs">{currentTrack.artist}</div>
              </div>
              <button
                onClick={handleLikeToggle}
                className="ml-4 focus:outline-none"
              >
                <i className={`${isLiked(currentTrack?.id) ? 'fas' : 'far'} fa-heart text-spotify-green`}></i>
              </button>
            </>
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={playPrevious}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <i className="fas fa-backward"></i>
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-1.1 focus:outline-none"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button
              onClick={playNext}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <i className="fas fa-forward"></i>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime || 0}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end w-1/4 space-x-2">
          <i className="fas fa-volume-up text-gray-400"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
