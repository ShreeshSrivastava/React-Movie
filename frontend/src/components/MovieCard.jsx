import React from 'react';
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  function onFavoriteClick() {
    alert("You clicked: " + movie.title);
  }

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      <div className="movie-overlay">
        <button className="favorite-btn" onClick={onFavoriteClick}>
        💖
        </button>
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <span>Rating: {movie.rating}</span>
        <p>Release Date: {movie.release_date?.split("-")[0]}</p>
        <p>ID Number: {movie.id}</p>
      </div>
    </div>
  );
}

export default MovieCard;
