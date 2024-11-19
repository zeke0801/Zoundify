import { useState, useEffect } from 'react';

const LIKED_SONGS_KEY = 'zoundify_liked_songs';
const PLAYLISTS_KEY = 'zoundify_playlists';
const PLAYBACK_STATE_KEY = 'zoundify_playback_state';
const SEARCH_HISTORY_KEY = 'zoundify_search_history';

export function useLikedSongs() {
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem(LIKED_SONGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(likedSongs));
  }, [likedSongs]);

  const addLikedSong = (song) => {
    setLikedSongs(prev => [...prev, song]);
  };

  const removeLikedSong = (songId) => {
    setLikedSongs(prev => prev.filter(song => song.id !== songId));
  };

  const isLiked = (songId) => {
    return likedSongs.some(song => song.id === songId);
  };

  return { likedSongs, addLikedSong, removeLikedSong, isLiked };
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem(PLAYLISTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name, description = '') => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist.id;
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  };

  const updatePlaylist = (playlistId, updates) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return playlist;
    }));
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && !playlist.songs.some(s => s.id === song.id)) {
        return {
          ...playlist,
          songs: [...playlist.songs, song],
          updatedAt: new Date().toISOString(),
        };
      }
      return playlist;
    }));
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId),
          updatedAt: new Date().toISOString(),
        };
      }
      return playlist;
    }));
  };

  const getPlaylist = (playlistId) => {
    return playlists.find(playlist => playlist.id === playlistId);
  };

  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylist,
  };
}

export function usePlaybackState() {
  const [playbackState, setPlaybackState] = useState(() => {
    const saved = localStorage.getItem(PLAYBACK_STATE_KEY);
    return saved ? JSON.parse(saved) : {
      currentTrack: null,
      currentTime: 0,
      volume: 0.5,
    };
  });

  useEffect(() => {
    localStorage.setItem(PLAYBACK_STATE_KEY, JSON.stringify(playbackState));
  }, [playbackState]);

  const updatePlaybackState = (track, time) => {
    setPlaybackState(prev => ({
      ...prev,
      currentTrack: track,
      currentTime: time,
    }));
  };

  const updateVolume = (volume) => {
    setPlaybackState(prev => ({
      ...prev,
      volume,
    }));
  };

  return { playbackState, updatePlaybackState, updateVolume };
}

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev].slice(0, 5));
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addToHistory, clearHistory };
}
