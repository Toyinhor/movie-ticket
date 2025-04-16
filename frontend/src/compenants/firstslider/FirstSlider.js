import React, { useState, useEffect } from "react";
import "./FirstSlider.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const backendURL = "http://localhost:8080"; // URL Backend

export default function FirstSlider() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${backendURL}/api/movies`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNext = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    if (movies.length > 0) {
      const intervalId = setInterval(handleNext, 9000);
      return () => clearInterval(intervalId);
    }
  }, [movies, currentMovieIndex]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (movies.length === 0) return <p>No movies available.</p>;

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-0">
        <div className="col-12 col-md-12 w-50 ">
          <div className="movie-details mt-5">
            <h1 className="mb-5">{movies[currentMovieIndex].title}</h1>
            <p className="px-2">
              <strong id="sp">Genre</strong>: {movies[currentMovieIndex].genre || "Unknown"}
            </p>
            <p className="px-2">
              <strong id="sp">Duration</strong>: {movies[currentMovieIndex].duration}
            </p>
            <p className="px-2">
              <strong id="sp">StoryLine</strong>: {movies[currentMovieIndex].description}
            </p>
          </div>
          <div className="test">
            <div className="pos2">
              <Link to={`/buy-ticket/${movies[currentMovieIndex].id}`} id="lk">
                <button className="buy-ticket-button ms-3 ms-md-5 px-2 px-md-5 btn">Buy Ticket</button>
              </Link>
            </div>
            <div className="pos1">
              <button className="previous-button me-3 px-2 px-md-3 py-1 py-md-2" onClick={handlePrevious}>
                {" < "}
              </button>
              <button className="next-button px-2 px-md-3 py-1 py-md-2" onClick={handleNext}>
                {" > "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="image-container aa">
        <img
          src={`${backendURL}${movies[currentMovieIndex].imageUrl}`}
          alt={movies[currentMovieIndex].title}
          className="movie-image img-fluid aa p-0 m-0"
        />
      </div>
    </div>
  );
}
