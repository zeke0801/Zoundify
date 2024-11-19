// Keys for localStorage
const STORAGE_KEYS = {
  LIKED_SONGS: 'spotify_liked_songs',
  PLAYLISTS: 'spotify_playlists',
  CURRENT_TRACK: 'spotify_current_track',
  PLAYBACK_POSITION: 'spotify_playback_position',
};

// Liked Songs functions
export const getLikedSongs = () => {
  const songs = localStorage.getItem(STORAGE_KEYS.LIKED_SONGS);
  return songs ? JSON.parse(songs) : [];
};

export const addLikedSong = (song) => {
  const likedSongs = getLikedSongs();
  if (!likedSongs.some(s => s.id === song.id)) {
    likedSongs.push(song);
    localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(likedSongs));
  }
};

export const removeLikedSong = (songId) => {
  const likedSongs = getLikedSongs();
  const updatedSongs = likedSongs.filter(song => song.id !== songId);
  localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(updatedSongs));
};

export const isLikedSong = (songId) => {
  const likedSongs = getLikedSongs();
  return likedSongs.some(song => song.id === songId);
};

// Playback State functions
export const savePlaybackState = (track, position) => {
  if (track) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TRACK, JSON.stringify(track));
  }
  if (position) {
    localStorage.setItem(STORAGE_KEYS.PLAYBACK_POSITION, position.toString());
  }
};

export const getPlaybackState = () => {
  const track = localStorage.getItem(STORAGE_KEYS.CURRENT_TRACK);
  const position = localStorage.getItem(STORAGE_KEYS.PLAYBACK_POSITION);
  return {
    currentTrack: track ? JSON.parse(track) : null,
    position: position ? parseInt(position) : 0
  };
};

// Playlist functions
export const getPlaylists = () => {
  const playlists = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
  return playlists ? JSON.parse(playlists) : [];
};

export const savePlaylist = (playlist) => {
  const playlists = getPlaylists();
  const existingIndex = playlists.findIndex(p => p.id === playlist.id);
  
  if (existingIndex >= 0) {
    playlists[existingIndex] = playlist;
  } else {
    playlists.push(playlist);
  }
  
  localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
};

export const removePlaylist = (playlistId) => {
  const playlists = getPlaylists();
  const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
  localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(updatedPlaylists));
};
