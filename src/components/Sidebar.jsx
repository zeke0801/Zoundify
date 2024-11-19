import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePlaylists } from '../hooks/useLocalStorage';

function Sidebar() {
  const location = useLocation();
  const { playlists, createPlaylist } = usePlaylists();
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-spotify-black p-6 flex flex-col">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold text-spotify-white hover:text-spotify-green">
          Zoundify
        </Link>
      </div>
      
      <nav className="mb-8">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`flex items-center text-sm font-semibold ${
                location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="fas fa-home w-6 h-6 mr-4"></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`flex items-center text-sm font-semibold ${
                location.pathname === '/search' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="fas fa-search w-6 h-6 mr-4"></i>
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className={`flex items-center text-sm font-semibold ${
                location.pathname === '/library' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="fas fa-book w-6 h-6 mr-4"></i>
              Your Library
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsCreatingPlaylist(true)}
            className="flex items-center text-sm font-semibold text-gray-400 hover:text-white"
          >
            <i className="fas fa-plus-circle w-6 h-6 mr-4"></i>
            Create Playlist
          </button>
        </div>
        <Link
          to="/liked"
          className={`flex items-center text-sm font-semibold ${
            location.pathname === '/liked' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <i className="fas fa-heart w-6 h-6 mr-4"></i>
          Liked Songs
        </Link>
      </div>

      <div className="border-t border-gray-800 pt-4 mt-2">
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={`block text-sm ${
                location.pathname === `/playlist/${playlist.id}`
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>

      {isCreatingPlaylist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-spotify-black p-6 rounded-lg w-96">
            <h3 className="text-white font-bold mb-4">Create New Playlist</h3>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="w-full p-2 mb-4 rounded bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green"
              autoFocus
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsCreatingPlaylist(false)}
                className="px-4 py-2 text-white hover:text-spotify-green"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="px-4 py-2 rounded bg-spotify-green text-black font-medium hover:bg-opacity-80"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
