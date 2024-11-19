import React, { useState } from 'react';
import { usePlaylists } from '../hooks/useLocalStorage';

const Playlist = ({ playlist }) => {
  const { savePlaylist, deletePlaylist } = usePlaylists();
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name || '');

  const handleSave = () => {
    if (!playlistName.trim()) return;

    const updatedPlaylist = {
      ...playlist,
      id: playlist?.id || Date.now(),
      name: playlistName,
      songs: playlist?.songs || [],
    };

    savePlaylist(updatedPlaylist);
    setIsEditing(false);
  };

  return (
    <div className="ml-64 p-8 bg-gradient-to-b from-blue-900 to-spotify-black min-h-screen">
      <header className="flex items-center mb-8">
        <div className="w-60 h-60 bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
          {playlist?.coverImage ? (
            <img 
              src={playlist.coverImage} 
              alt={playlistName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-spotify-gray flex items-center justify-center">
              <i className="fas fa-plus text-6xl text-white"></i>
            </div>
          )}
        </div>
        <div className="ml-6">
          <p className="text-sm text-gray-300 uppercase">Playlist</p>
          {isEditing ? (
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              onBlur={handleSave}
              className="text-4xl font-bold bg-transparent text-white mt-2 mb-4 focus:outline-none"
              autoFocus
            />
          ) : (
            <h1 
              className="text-5xl font-bold text-white mt-2 mb-4 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {playlistName || 'New Playlist'}
            </h1>
          )}
          <p className="text-gray-300">{playlist?.songs?.length || 0} songs</p>
        </div>
      </header>

      <div className="mt-8">
        {playlist?.songs?.map((song, index) => (
          <div 
            key={song.id}
            className="group grid grid-cols-[0.5fr,2fr,1fr] items-center px-4 py-2 rounded-md hover:bg-white/10"
          >
            <div className="flex items-center">
              <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
              <button className="hidden group-hover:block">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
            <div className="flex items-center">
              <img 
                src={song.albumArt || 'https://via.placeholder.com/40'} 
                alt={song.title} 
                className="w-10 h-10 mr-4"
              />
              <div>
                <p className="text-white">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400">{song.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
