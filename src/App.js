import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import { SearchProvider } from './context/SearchContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MainView from './components/MainView';
import LikedSongs from './components/LikedSongs';
import Playlist from './components/Playlist';
import Search from './components/Search';

function App() {
  return (
    <MusicProvider>
      <SearchProvider>
        <Router>
          <div className="flex h-screen bg-spotify-black">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/search" element={<Search />} />
                <Route path="/liked" element={<LikedSongs />} />
                <Route path="/playlist/:id" element={<Playlist />} />
              </Routes>
            </main>
            <Player />
          </div>
        </Router>
      </SearchProvider>
    </MusicProvider>
  );
}

export default App;
