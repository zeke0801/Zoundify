import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useMusic } from '../context/MusicContext';
import { usePlaylists } from '../hooks/useLocalStorage';

export default function Search() {
  const [query, setQuery] = useState('');
  const { 
    searchResults, 
    searchHistory, 
    isLoading, 
    popularTracks,
    search, 
    clearHistory,
    loadPopularTracks 
  } = useSearch();
  const { playTrack, addToQueue } = useMusic();
  const { playlists, addSongToPlaylist } = usePlaylists();
  const [selectedSong, setSelectedSong] = useState(null);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  useEffect(() => {
    loadPopularTracks();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        search(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search]);

  const handleAddToPlaylist = (song, playlistId) => {
    addSongToPlaylist(playlistId, song);
    setShowPlaylistMenu(false);
    setSelectedSong(null);
  };

  const renderTrackList = (tracks, title) => (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-2">
        {tracks.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:bg-opacity-10"
          >
            <div className="flex items-center flex-1">
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-12 h-12 rounded mr-4"
              />
              <div>
                <h3 className="text-white font-medium">{song.title}</h3>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="flex items-center mr-4">
                <i className="fas fa-heart mr-1"></i>
                <span>{song.likes}</span>
              </div>
              <div className="flex items-center mr-4">
                <i className="fas fa-download mr-1"></i>
                <span>{song.downloads}</span>
              </div>
              <button
                onClick={() => playTrack(song)}
                className="px-3 py-1 rounded-full bg-spotify-green text-black font-medium hover:bg-opacity-80"
              >
                <i className="fas fa-play mr-1"></i>
                Play
              </button>
              <button
                onClick={() => addToQueue(song)}
                className="px-3 py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:bg-opacity-10"
              >
                <i className="fas fa-list mr-1"></i>
                Queue
              </button>
              <button
                onClick={() => {
                  setSelectedSong(song);
                  setShowPlaylistMenu(true);
                }}
                className="px-3 py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:bg-opacity-10"
              >
                <i className="fas fa-plus mr-1"></i>
                Add to Playlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="relative mb-6">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, or genres"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <i className="fas fa-times text-gray-400"></i>
            </button>
          )}
        </div>
      </div>

      {!query && searchHistory.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Recent Searches</h2>
            <button
              onClick={clearHistory}
              className="text-sm text-gray-400 hover:text-white"
            >
              <i className="fas fa-trash-alt mr-1"></i>
              Clear
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => setQuery(term)}
                className="p-4 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 text-left"
              >
                <i className="fas fa-history mr-2"></i>
                <span className="text-white">{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <i className="fas fa-spinner fa-spin text-spotify-green text-3xl"></i>
        </div>
      ) : (
        <>
          {query && searchResults.length > 0 && renderTrackList(searchResults, 'Search Results')}
          {!query && popularTracks.length > 0 && renderTrackList(popularTracks, 'Popular Tracks')}
        </>
      )}

      {/* Playlist Menu Modal */}
      {showPlaylistMenu && selectedSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-spotify-black p-6 rounded-lg w-96">
            <h3 className="text-white font-bold mb-4">
              <i className="fas fa-list-music mr-2"></i>
              Add to Playlist
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleAddToPlaylist(selectedSong, playlist.id)}
                  className="w-full text-left p-3 rounded hover:bg-white hover:bg-opacity-10 text-white"
                >
                  <i className="fas fa-music mr-2"></i>
                  {playlist.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowPlaylistMenu(false);
                setSelectedSong(null);
              }}
              className="mt-4 w-full p-2 rounded bg-spotify-green text-black font-medium hover:bg-opacity-80"
            >
              <i className="fas fa-times mr-1"></i>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
