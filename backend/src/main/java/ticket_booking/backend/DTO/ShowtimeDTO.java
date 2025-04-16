package ticket_booking.backend.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
@Data
public class ShowtimeDTO implements Serializable {
    private Integer id;
    private Integer movie_id;
    private LocalDate date;
    private LocalTime showtime;
}
