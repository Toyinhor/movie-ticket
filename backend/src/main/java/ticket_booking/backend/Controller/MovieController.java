package ticket_booking.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ticket_booking.backend.DTO.MovieDTO;
import ticket_booking.backend.Entity.MovieEntity;
import ticket_booking.backend.Service.MovieService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Integer id) {
        MovieDTO movie = movieService.getMovieById(id);
        return movie != null ? ResponseEntity.ok(movie) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MovieEntity> createMovie(
            @RequestParam("title") String title,
            @RequestParam("genre") String genre,
            @RequestParam("description") String description,
            @RequestParam("releaseDate") LocalDate releaseDate,
            @RequestParam("duration") String duration,
            @RequestParam("language") String language,
            @RequestParam("country") String country,
            @RequestParam("dispo") boolean dispo,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "poster", required = false) MultipartFile poster
    ) throws Exception {
        MovieDTO dto = new MovieDTO(null,title,genre,description,releaseDate,duration,language,country,null,null,dispo,null);
        MovieEntity movie = movieService.saveMovie(dto,image,poster);
        return ResponseEntity.ok(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieDTO> updateMovie(
            @PathVariable Integer id,
            @RequestParam("title") String title,
            @RequestParam("genre") String genre,
            @RequestParam("description") String description,
            @RequestParam("releaseDate") LocalDate releaseDate,
            @RequestParam("duration") String duration,
            @RequestParam("language") String language,
            @RequestParam("country") String country,
            @RequestParam("dispo") boolean dispo,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "poster", required = false) MultipartFile poster
    ) {
        MovieDTO dto = new MovieDTO(null, title, genre, description, releaseDate, duration, language, country, null, null, dispo,null);

        MovieDTO updatedMovie = movieService.updateMovie(id,dto,image,poster);
        return updatedMovie != null ? ResponseEntity.ok(updatedMovie) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Integer id) {
        return movieService.deleteMovie(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
