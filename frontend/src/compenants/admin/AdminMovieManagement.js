import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const backendURL = "http://localhost:8080";

const AdminMovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reloadTimestamp, setReloadTimestamp] = useState(Date.now());
  const [formData, setFormData] = useState({
    title: "", genre: "", description: "", releaseDate: "", duration: "",
    language: "", country: "", dispo: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${backendURL}/api/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleShow = (movie = null) => {
    setSelectedMovie(movie);
    setFormData(movie || {
      title: "", genre: "", description: "", releaseDate: "", duration: "",
      language: "", country: "", dispo: false
    });
    setImageFile(null);
    setPosterFile(null);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      setImageFile(file);
    } else {
      setPosterFile(file);
    }
  };

  const handleSave = async () => {
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("genre", formData.genre);
    formDataObj.append("description", formData.description);
    formDataObj.append("releaseDate", formData.releaseDate);
    formDataObj.append("duration", formData.duration);
    formDataObj.append("language", formData.language);
    formDataObj.append("country", formData.country);
    formDataObj.append("dispo", formData.dispo);
    if (imageFile) formDataObj.append("image", imageFile);
    if (posterFile) formDataObj.append("poster", posterFile);

    try {
      const method = selectedMovie ? "PUT" : "POST";
      const url = selectedMovie
        ? `${backendURL}/api/movies/${selectedMovie.id}`
        : `${backendURL}/api/movies`;
      const response = await fetch(url, {
        method,
        body: formDataObj,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.json();
      // Cập nhật reloadTimestamp để ép trình duyệt tải lại ảnh mới
      setReloadTimestamp(Date.now());
      fetchMovies();
      handleClose();
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${backendURL}/api/movies/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: 'red' }}>Quản lý phim</h2>
      <Button variant="primary" onClick={() => handleShow()}>Thêm phim</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Thể loại</th>
            <th>Ngày phát hành</th>
            <th>Thời lượng</th>
            <th>Ngôn ngữ</th>
            <th>Quốc gia</th>
            <th>Ảnh</th>
            <th>Poster</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.releaseDate}</td>
              <td>{movie.duration}</td>
              <td>{movie.language}</td>
              <td>{movie.country}</td>
              <td>
                <Image 
                  src={`${backendURL}${movie.imageUrl}?t=${reloadTimestamp}`} 
                  alt="Movie Image" width="100" height="55" 
                />
              </td>
              <td>
                <Image 
                  src={`${backendURL}${movie.posterUrl}?t=${reloadTimestamp}`} 
                  alt="Movie Poster" width="100" height="120" 
                />
              </td>
              <td>{movie.dispo ? "Đang chiếu" : "Chưa chiếu"}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(movie)}>Sửa</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(movie.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie ? "Chỉnh sửa phim" : "Thêm phim"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Thể loại</Form.Label>
              <Form.Control name="genre" value={formData.genre} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mô tả</Form.Label>
              <Form.Control name="description" as="textarea" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ngày phát hành</Form.Label>
              <Form.Control type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Thời lượng (phút)</Form.Label>
              <Form.Control name="duration" value={formData.duration} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ngôn ngữ</Form.Label>
              <Form.Control name="language" value={formData.language} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quốc gia</Form.Label>
              <Form.Control name="country" value={formData.country} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            < Form.Select name="dispo" value={formData.dispo} onChange={handleChange}>
                <option value="true">Hiển thị</option>
                <option value="false">Ẩn</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ảnh</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, "image")} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poster</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, "poster")} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Đóng</Button>
          <Button variant="primary" onClick={handleSave}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMovieManagement;
