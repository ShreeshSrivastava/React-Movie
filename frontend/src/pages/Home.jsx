import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovie } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try{
        const newMovies = await getPopularMovie(page);
        if (newMovies.length === 0) {
          setHasMore(false);
        }
        else {
          setMovies(prev => [...prev, ...newMovies]);
        } }
        catch (err) {
          setErrors("Failed to fetch movies");
        }
        finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, [page]);

   useEffect(() => {
const handleScroll = () => {
  if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loading && 
    hasMore) {
      setPage(prev => prev + 1);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [loading, hasMore]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setPage(1);
    setHasMore(false);
    setErrors(null);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setErrors(null);
    } catch (err) {
      console.error("Search error:", err);
      setErrors("Failed to fetch search results");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

    return (
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map(
              (movie) =>
                <div className="movie-card" key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
            )}
          </div>
        )}
      </div>
    );
  };

export default Home;
