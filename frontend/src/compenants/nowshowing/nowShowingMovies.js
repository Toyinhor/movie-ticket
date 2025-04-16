import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./nowShowingMovies.css";

const backendURL = "http://localhost:8080";

const NowShowing = () => {
  const [movies, setMovies] = useState([]);
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
        console.log(data)
        const nowShowingMovies = data.filter((movie) => movie.dispo === true);
        setMovies(nowShowingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const formatShowtimes = (showtimes) =>
    showtimes?.length > 0 ? (
      showtimes.map((time, index) => (
        <span key={index} className="showtime">
          {time.showtime}
        </span>
      ))
    ) : (
      <span className="showtime">No showtimes available</span>
    );

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <div className="div1">
        <h2 data-text="Now Showing">Now Showing</h2>
      </div>
      <hr style={{ color: "red" }} />
      <div className="now-showing-container justify-content-center justify-content-md-start">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card key={movie.id} className="movie-card1 my-2 my-md-4 mx-0 mx-md-4">
              <Card.Img
                className="movie-image"
                variant="top"
                src={`${backendURL}${movie.posterUrl}`}
                alt={movie.title}
                onError={(e) => (e.target.src = "/default-poster.jpg")}
              />
              <div className="movie-details">
                <Link to={`/movie/${movie.id}`} id="lk">
                  <Card.Title className="title1">{movie.title}</Card.Title>
                </Link>
                <div className="movie-dt2">
                  <Card.Text className="card-text">
                    <strong id="sh">Showtimes:</strong> {formatShowtimes(movie.showtimeEntity)}
                  </Card.Text>
                  <Link to={`/buy-ticket/${movie.id}`} id="lk">
                    <Button variant="primary" id="buy1">
                      Buy Ticket
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default NowShowing;
