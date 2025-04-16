package ticket_booking.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "seats")
public class SeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "showtime_id")
    private Integer showtimeId;

    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;

    @ColumnDefault("'available'")
    @Lob
    @Column(name = "status")
    private String status;

}