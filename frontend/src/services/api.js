const API_KEY = "0a02bd42d750552ac5b2ff52de4d246c";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovie = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data.results;
};

