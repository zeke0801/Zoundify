import React, { createContext, useContext, useReducer, useRef } from 'react';
import { usePlaybackState } from '../hooks/useLocalStorage';

const MusicContext = createContext();

const initialState = {
  isPlaying: false,
  currentTrack: null,
  queue: [],
  volume: 0.5,
};

function musicReducer(state, action) {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
      };
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    default:
      return state;
  }
}

export function MusicProvider({ children }) {
  const [state, dispatch] = useReducer(musicReducer, initialState);
  const audioRef = useRef(new Audio());
  const { updatePlaybackState } = usePlaybackState();

  const playTrack = (track) => {
    if (state.currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    audioRef.current.src = track.audioUrl;
    audioRef.current.play().catch(error => console.error('Playback failed:', error));
    dispatch({ type: 'SET_TRACK', payload: track });
    updatePlaybackState(track, 0);
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error('Playback failed:', error));
    }
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const setVolume = (volume) => {
    audioRef.current.volume = volume;
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    updatePlaybackState(state.currentTrack, time);
  };

  const playNext = () => {
    if (state.queue.length > 0) {
      const nextTrack = state.queue[0];
      const newQueue = state.queue.slice(1);
      dispatch({ type: 'SET_QUEUE', payload: newQueue });
      playTrack(nextTrack);
    }
  };

  const addToQueue = (track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track });
  };

  // Set up audio event listeners
  React.useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener('ended', playNext);
    audio.addEventListener('timeupdate', () => {
      updatePlaybackState(state.currentTrack, audio.currentTime);
    });

    return () => {
      audio.removeEventListener('ended', playNext);
      audio.removeEventListener('timeupdate', () => {});
    };
  }, [state.currentTrack, updatePlaybackState]);

  // Update volume when state changes
  React.useEffect(() => {
    audioRef.current.volume = state.volume;
  }, [state.volume]);

  const value = {
    ...state,
    playTrack,
    togglePlay,
    setVolume,
    seekTo,
    playNext,
    addToQueue,
    currentTime: audioRef.current.currentTime,
    duration: audioRef.current.duration,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
