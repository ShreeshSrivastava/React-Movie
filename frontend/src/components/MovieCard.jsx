import React from 'react';
import "../css/MovieCard.css";
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie)
  }
  

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/fallback-poster.jpg"
        }
        alt={movie.title}
      />

      <div className="movie-overlay">
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          💖
        </button>
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>
          {movie.overview.length > 200
            ? movie.overview.slice(0, 200) + "..."
            : movie.overview}
        </p>
        <span>Rating: {movie.vote_average}</span>
        <p>Release Date: {movie.release_date?.split("-")[0]}</p>
        <p>ID Number: {movie.id}</p>
      </div>
    </div>
  );
}

export default MovieCard;
