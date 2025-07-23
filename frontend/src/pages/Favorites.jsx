import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites?.length) {
    // De-duplicate using movie ID
    const uniqueFavorites = Array.from(
      new Map(favorites.map((movie) => [movie.id, movie])).values()
    );

    return (
      <div className="movies-grid">
        {uniqueFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Added</h2>
      <p>
        Add movies to your favorites list by clicking the heart icon on a movie card.
      </p>
    </div>
  );
}

export default Favorites;
