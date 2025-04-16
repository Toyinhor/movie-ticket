package ticket_booking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ticket_booking.backend.Entity.ShowtimeEntity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO implements Serializable {
    private Integer id;
    private String title;
    private String genre;
    private String description;
    private LocalDate releaseDate;
    private String duration;
    private String language;
    private String country;
    private String imageUrl;
    private String posterUrl;
    private Boolean dispo;
    private List<ShowtimeEntity> showtimeEntity;
}
