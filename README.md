
# 🎬 Movie Booking API Showcase

This project provides a RESTful API for a movie ticket booking system. The available endpoints allow interaction with movies, showtimes, tickets, and seat availability.

## 📸 API Overview

![API Swagger UI](./404b29e2-0e4d-41f7-9669-012e16f4a6eb.png)

---

## 📂 Controllers & Endpoints

### 🎥 movie-controller

- `GET /api/movies` — Get all movies  
- `GET /api/movies/{id}` — Get movie by ID  
- `POST /api/movies` — Add a new movie  
- `PUT /api/movies/{id}` — Update a movie  
- `DELETE /api/movies/{id}` — Delete a movie  

### 🎫 ticket-controller

- `POST /ticket` — Book a ticket  

### 🕒 showtime-controller

- `POST /showtime` — Create new showtime  
- `GET /showtime/{id}/{date}` — Get showtime by movie ID and date  
- `GET /showtime/date/{id}` — Get showtimes by movie ID  
- `DELETE /showtime/delete` — Delete showtime  

### 💺 seat-controller

- `GET /seat/occupied/{showTimeId}` — Get occupied seats for a showtime  

---

## 🚀 Try it Out

You can test all the APIs via Swagger UI or Postman for development and debugging.
