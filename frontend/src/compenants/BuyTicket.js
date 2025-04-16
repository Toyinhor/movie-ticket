import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToPurchaseHistory } from './reducers/action';
import Seat from './Seats/Seat';
import './BuyTicket.css';

const backendURL = "http://localhost:8080";

const BuyTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dates, setDates] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [curShowTimeId, setCurShowTimeId] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${backendURL}/api/movies/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setMovieDetails(data);
        if (data.showtimeEntity && data.showtimeEntity.length > 0) {
          setCurShowTimeId(data.showtimeEntity[0].id);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
  
    const fetchDates = async () => {
      try {
        const response = await fetch(`${backendURL}/showtime/date/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setDates(data);
        setSelectedDate(data[0] || "");
      } catch (error) {
        console.error("Error fetching showtime dates:", error);
      }
    };
  
    fetchMovieDetails();
    fetchDates();
  }, [id]);
  

  useEffect(() => {
    if (selectedDate) {
      const fetchShowtimes = async () => {
        try {
          const response = await fetch(`${backendURL}/showtime/${id}/${selectedDate}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          setShowtimes(data);
          setSelectedShowtime(data[0] || "");
          if (movieDetails && movieDetails.showTimeEntity) {
            const matchedShowtime = movieDetails.showTimeEntity.find(st => st.showtime === data[0]);
            if (matchedShowtime) setCurShowTimeId(matchedShowtime.id);
          }
        } catch (error) {
          console.error("Error fetching showtimes:", error);
        }
      };
      fetchShowtimes();
    }
  }, [id, selectedDate]);

  const handleTicketQuantityChange = (e) => {
    setTicketQuantity(parseInt(e.target.value, 10));
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);


    if (!movieDetails || !movieDetails.showtimeEntity) {
        console.log("showtimeEntity is undefined! Không thể tìm suất chiếu.");
        return;
    }

   

    const matchedShowtime = movieDetails.showtimeEntity.find(st => st.showtime === e.target.value);

    if (matchedShowtime) {
        setCurShowTimeId(matchedShowtime.id);
    } else {
        console.log("Không tìm thấy suất chiếu phù hợp!");
    }
};


const handleDateChange = (e) => {
  const newDate = e.target.value;
  setSelectedDate(newDate);

  if (!movieDetails || !movieDetails.showtimeEntity) {
      console.log("Không có showtimeEntity để lọc!");
      return;
  }

  const filteredShowtimes = movieDetails.showtimeEntity.filter(st => st.date === newDate);

  if (filteredShowtimes.length > 0) {
      setSelectedShowtime(filteredShowtimes[0].showtime);
      setCurShowTimeId(filteredShowtimes[0].id);
  } else {
      setSelectedShowtime("");
      setCurShowTimeId(null);
  }
};


  const handlePurchase = (e) => {
    e.preventDefault();
    if (movieDetails) {
      const { id, title, price } = movieDetails;
      dispatch(addToPurchaseHistory({ id, title, price, quantity: ticketQuantity, showtime: selectedShowtime, date: selectedDate }));
      navigate('/purchase-history');
    } else {
      alert('Movie details not available');
    }
  };

  useEffect(() => {
  }, [curShowTimeId]);
  

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="buy-ticket-container">
      <h2>{movieDetails.title}</h2>
      <img src={`${backendURL}/${movieDetails.posterUrl}`} alt={movieDetails.title} className="movie-image9" />

      <div className="movie-details">
        <p className='p56'>{movieDetails.description}</p>
        <p className='p56'>Language: {movieDetails.language}</p>
        <p className='p56'>Date:</p>
        <select value={selectedDate} onChange={handleDateChange} className="selc77">
          {dates.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <p className='p56'>Showtimes:</p>
        <select value={selectedShowtime} onChange={handleShowtimeChange} className="selc77">
          {showtimes.map((showtime) => (
            <option key={showtime} value={showtime}>{showtime}</option>
          ))}
        </select>
        <p className='p56'>Chose Your Seat:</p>
        <Seat showtimeId={curShowTimeId} />
        <p className='p56'>Duration: {movieDetails.duration}</p>
        <p className='p56'>Price: {movieDetails.price} $</p>
      </div>

      <form onSubmit={handlePurchase} className="purchase-form">
        <label htmlFor="quantity" id='qt2'>Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={ticketQuantity}
          onChange={handleTicketQuantityChange}
          className="quantity-input"
        />
        <button type="submit" className="purchase-button">Purchase Ticket</button>
      </form>
    </div>
  );
};

export default BuyTicket;