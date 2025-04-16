import './Seat.css';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const backendURL = "http://localhost:8080"; 


const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function Seat({ showtimeId }) {
  const [occupiedSeats, setOccupiedSeats] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]); 
  
  useEffect(() => {
    if (!showtimeId) return;

    const url = `${backendURL}/seat/occupied/${showtimeId}`;

    const fetchOccupiedSeats = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
       
        const occupiedSeatNumbers = data.map(seat => Number(seat.seatNumber));
        setOccupiedSeats(occupiedSeatNumbers);
      } catch (error) {
        console.error("Error fetching occupied seats:", error);
      }
    };

    fetchOccupiedSeats();
  }, [showtimeId]);

  return (
    <div className="cineseat">
      <ShowCase />
      <Cinema
        occupiedSeats={occupiedSeats}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={setSelectedSeats}
      />
    </div>
  );
}


function ShowCase() {
  return (
    <div className='cineseat'>
      <ul className="ShowCase">
        <li><span className="seat" /> <small>N/A</small></li>
        <li><span className="seat selected" /> <small>Selected</small></li>
        <li><span className="seat occupied" /> <small>Occupied</small></li>
      </ul>
    </div>
  );
}


function Cinema({ occupiedSeats, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    if (occupiedSeats.includes(Number(seat))) return;
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className='cineseat'>
      <div className="Cinema">
        <div className="screen" />
        <div className="seats">
          {seats.map(seat => {
            const isSelected = selectedSeats.includes(seat);
            const isOccupied = occupiedSeats.includes(Number(seat));
            return (
              <span
                key={seat}
                className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={isOccupied ? null : (e) => { if (e.key === 'Enter') handleSelectedState(seat); }} tabIndex="0"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Seat, ShowCase, Cinema };
