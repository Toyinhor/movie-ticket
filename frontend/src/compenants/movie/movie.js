import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./movie.css";

const backendURL = "http://localhost:8080"; // Backend URL

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/movies`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Bộ lọc phim theo trạng thái và tìm kiếm theo tiêu đề
  const filteredMovies = movies.filter((movie) => {
    return (
      (filter === "all" || (filter === "available" && movie.dispo === true)) &&
      (searchTerm === "" ||
        (movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  });

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="movie-container4">
      <div className="filter-section">
        <label className="lb4">Filter:</label>
        <select value={filter} className="sl4" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
        </select>

        <label className="lb4">Search:</label>
        <input
          type="text"
          className="ip4"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bt4" onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      <div className="movies-section4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie4">
              <div className="movie-img4">
                <img 
                  src={`${backendURL}${movie.posterUrl}`} 
                  alt={movie.title} 
                  className="movie-img4" 
                  onError={(e) => e.target.src = "/default-poster.jpg"} // Hiển thị ảnh mặc định nếu lỗi
                />
              </div>
              <div className="movie-details4">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                {movie.dispo ? (
                  <Link to={`/buy-ticket/${movie.id}`}>
                    <button className="buy-ticket-btn4">Buy Ticket</button>
                  </Link>
                ) : (
                  <button className="notify-btn4">Notify Me</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
