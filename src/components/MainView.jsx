import React from 'react';

const MainView = () => {
  const playlists = [
    { id: 1, name: 'Daily Mix 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Discover Weekly', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Release Radar', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Liked Songs', imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="ml-64 p-8 bg-gradient-to-b from-spotify-gray to-spotify-black min-h-screen">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Good evening</h2>
        <div className="flex space-x-4">
          <button className="btn btn-primary">Play</button>
          <button className="btn btn-secondary">Follow</button>
        </div>
      </header>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Your playlists</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id} 
              className="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer"
            >
              <img 
                src={playlist.imageUrl} 
                alt={playlist.name} 
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h4 className="text-white font-semibold">{playlist.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainView;
