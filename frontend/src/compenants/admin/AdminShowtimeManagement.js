import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const backendURL = "http://localhost:8080";

const AdminShowtimeManagement = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [show, setShow] = useState(false);
  const [newShowtime, setNewShowtime] = useState("");
  const [selectedAddDate, setSelectedAddDate] = useState("");
  const [selectedDate, setSelectedDate] = useState({});
  const [availableDates, setAvailableDates] = useState({});
  const [showtimes, setShowtimes] = useState({});

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${backendURL}/api/movies`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchAvailableDates = async (movieId) => {
    try {
      const response = await fetch(`${backendURL}/showtime/date/${movieId}`);
      if (!response.ok) throw new Error("Failed to fetch available dates");
      const dates = await response.json();
      setAvailableDates((prev) => ({ ...prev, [movieId]: dates }));
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const fetchShowtimesByDate = async (movieId, date) => {
    try {
      const response = await fetch(`${backendURL}/showtime/${movieId}/${date}`);
      if (!response.ok) throw new Error("Failed to fetch showtimes");
      const times = await response.json();
      setShowtimes((prev) => ({ ...prev, [movieId]: times }));
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleDateChange = (movieId, date) => {
    setSelectedDate((prev) => ({ ...prev, [movieId]: date }));
    fetchShowtimesByDate(movieId, date);
  };

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setSelectedAddDate("");
    setNewShowtime("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleAddShowtime = async () => {
    if (!selectedMovie || !newShowtime || !selectedAddDate) {
      alert("Vui lòng chọn phim, nhập ngày và giờ chiếu!");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/showtime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_id: selectedMovie.id,
          showtime: newShowtime,
          date: selectedAddDate,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        if (response.status === 400 && responseText.includes("Showtime đã tồn tại")) {
          alert("Suất chiếu này đã tồn tại!");
          return;
        }
        throw new Error(`Lỗi! Mã trạng thái: ${response.status} - ${responseText}`);
      }

      fetchMovies();
      setNewShowtime("");
      alert("Thêm suất chiếu thành công!");
    } catch (error) {
      alert("Lỗi khi thêm suất chiếu. Vui lòng thử lại!");
    }
  };

  const handleDeleteShowtime = async (movie_id, date, showtime) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa suất chiếu này không?")) return;
    try {
      const response = await fetch(`${backendURL}/showtime/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:null, movie_id, date, showtime }),
      });
      
      alert("Xóa suất chiếu thành công!");
    } catch (error) {
      alert("Lỗi khi xóa suất chiếu. Vui lòng thử lại!");
    }
    fetchMovies()
  };
  
  

  return (
    <div className="container mt-4">
      <h2 style={{ color: "blue" }}>Quản lý suất chiếu</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Thể loại</th>
            <th>Ngày chiếu</th>
            <th>Suất chiếu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>
                <Form.Select
                  onFocus={() => fetchAvailableDates(movie.id)}
                  onChange={(e) => handleDateChange(movie.id, e.target.value)}
                >
                  <option value="">Chọn ngày</option>
                  {(availableDates[movie.id] || []).map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                {(showtimes[movie.id] || []).map((st, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{st}</span>
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDeleteShowtime(movie.id, selectedDate[movie.id], st)}>
                        Xóa
                    </button>
                  </div>
                ))}
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleShow(movie)}>Thêm suất chiếu</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm suất chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn ngày chiếu</Form.Label>
              <Form.Control type="date" value={selectedAddDate} onChange={(e) => setSelectedAddDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ chiếu</Form.Label>
              <Form.Control type="time" value={newShowtime} onChange={(e) => setNewShowtime(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Hủy</Button>
          <Button variant="primary" onClick={handleAddShowtime}>Thêm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminShowtimeManagement;
