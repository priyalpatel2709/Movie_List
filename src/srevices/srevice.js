//fetch movie data from api
const apiKey = 'c9fa85be8ca8564e919b2d5e60d80e4f';
const baseUrl = 'https://api.themoviedb.org/4';
const discoverEndpoint = `${baseUrl}/discover/movie`;

const fetchMovies = async (page) => {
  try {
    const response = await fetch(
      `${discoverEndpoint}?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};



export {fetchMovies}
    
