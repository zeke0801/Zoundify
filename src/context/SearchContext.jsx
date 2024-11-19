import React, { createContext, useContext, useState } from 'react';
import { searchMusic, getPopularTracks } from '../services/pixabayApi';
import { useSearchHistory } from '../hooks/useLocalStorage';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();
  const [popularTracks, setPopularTracks] = useState([]);

  const search = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchMusic(query);
      setSearchResults(results);
      
      // Add to search history
      if (query.trim()) {
        addToHistory(query.trim());
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPopularTracks = async () => {
    try {
      const tracks = await getPopularTracks();
      setPopularTracks(tracks);
    } catch (error) {
      console.error('Failed to load popular tracks:', error);
    }
  };

  const value = {
    searchResults,
    searchHistory,
    isLoading,
    popularTracks,
    search,
    clearHistory,
    loadPopularTracks,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
