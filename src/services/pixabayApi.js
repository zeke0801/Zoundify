const PIXABAY_API_KEY = ''; // Add your API key here
const BASE_URL = 'https://pixabay.com/api/';

export async function searchMusic(query) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&category=music`
    );
    const data = await response.json();
    
    return data.hits.map(hit => ({
      id: hit.id.toString(),
      title: hit.tags.split(',')[0] || 'Unknown Title',
      artist: hit.user || 'Unknown Artist',
      duration: formatDuration(hit.duration),
      albumArt: hit.previewURL.replace('preview', 'preview.jpg'),
      audioUrl: hit.previewURL,
      likes: hit.likes,
      downloads: hit.downloads,
      tags: hit.tags
    }));
  } catch (error) {
    console.error('Error searching music:', error);
    return [];
  }
}

export async function getPopularTracks() {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${PIXABAY_API_KEY}&category=music&order=popular&per_page=20`
    );
    const data = await response.json();
    
    return data.hits.map(hit => ({
      id: hit.id.toString(),
      title: hit.tags.split(',')[0] || 'Unknown Title',
      artist: hit.user || 'Unknown Artist',
      duration: formatDuration(hit.duration),
      albumArt: hit.previewURL.replace('preview', 'preview.jpg'),
      audioUrl: hit.previewURL,
      likes: hit.likes,
      downloads: hit.downloads,
      tags: hit.tags
    }));
  } catch (error) {
    console.error('Error fetching popular tracks:', error);
    return [];
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
