package ticket_booking.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "movies")
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "genre", length = 50)
    private String genre;
    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "duration", length = 20)
    private String duration;

    @Column(name = "language", length = 50)
    private String language;

    @Column(name = "country", length = 50)
    private String country;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "poster_url")
    private String posterUrl;

    @ColumnDefault("0")
    @Column(name = "dispo")
    private Boolean dispo;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ShowtimeEntity> showtimeEntities;

}