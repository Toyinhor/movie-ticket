package ticket_booking.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ticket_booking.backend.DTO.ShowtimeDTO;
import ticket_booking.backend.Entity.ShowtimeEntity;
import ticket_booking.backend.Service.ShowtimeService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/showtime")
public class ShowtimeController {
    @Autowired
    ShowtimeService showtimeService;

    @PostMapping
    public ResponseEntity<?> createNewShowtime(@RequestBody ShowtimeDTO dto){
        ShowtimeEntity show = showtimeService.createNewShowtime(dto);
        if (show == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Showtime đã tồn tại!");
        }
        return ResponseEntity.ok(show);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteShowtime(@RequestBody ShowtimeDTO dto) {
        return showtimeService.deleteShowtime(dto) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/date/{id}")
    public ResponseEntity<List<LocalDate>> getAllDatesByMovieId(@PathVariable Integer id) {
        List<LocalDate> dateTimes =  showtimeService.getShowDatesByMovieId(id);
        return ResponseEntity.ok(dateTimes);
    }

    @GetMapping("/{id}/{date}")
    public ResponseEntity<List<LocalTime>> getAllTimeByMovieIdAndDate(@PathVariable Integer id,@PathVariable LocalDate date){
        List<LocalTime> times = showtimeService.getAllTimeByMovieIdAndDate(id, date);
        return ResponseEntity.ok(times);
    }
}
