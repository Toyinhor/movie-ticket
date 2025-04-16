package ticket_booking.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ticket_booking.backend.Entity.SeatEntity;
import ticket_booking.backend.Service.SeatService;

import java.util.List;

@RestController
@RequestMapping("/seat")
public class SeatController {
    @Autowired
    SeatService seatService;

    @GetMapping("/occupied/{showTimeId}")
    public ResponseEntity<List<SeatEntity>> findAllOccupiedSeat(@PathVariable Integer showTimeId) {
        List<SeatEntity> seats = seatService.findAllOccupiedSeatByShowtimeId(showTimeId);
        return ResponseEntity.ok(seats);
    }
}
