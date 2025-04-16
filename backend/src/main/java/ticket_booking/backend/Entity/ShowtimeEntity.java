package ticket_booking.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "showtimes")
public class ShowtimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "movie_id")
    private Integer movie_id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "showtime", nullable = false)
    private LocalTime showtime;

    @ManyToOne
    @JoinColumn(name = "movie_id",insertable = false, updatable = false)
    @JsonBackReference
    private MovieEntity movie;

}