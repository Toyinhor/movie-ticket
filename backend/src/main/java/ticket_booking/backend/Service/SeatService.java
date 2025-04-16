package ticket_booking.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticket_booking.backend.Entity.SeatEntity;
import ticket_booking.backend.Repository.SeatRepository;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    SeatRepository seatRepository;

    public List<SeatEntity> findAllOccupiedSeatByShowtimeId(Integer showTimeId) {
        List<SeatEntity> seats = seatRepository.findAllByShowtimeId(showTimeId);
        seats.removeIf(s -> s.getStatus().equals("available"));
        return seats;
    }
}
