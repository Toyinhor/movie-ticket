package ticket_booking.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ticket_booking.backend.DTO.MovieDTO;
import ticket_booking.backend.DTO.ShowtimeDTO;
import ticket_booking.backend.Entity.MovieEntity;
import ticket_booking.backend.Repository.MovieRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    private MovieDTO convertToDTO(MovieEntity movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setGenre(movie.getGenre());
        dto.setDescription(movie.getDescription());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setDuration(movie.getDuration());
        dto.setLanguage(movie.getLanguage());
        dto.setCountry(movie.getCountry());
        dto.setImageUrl(movie.getImageUrl());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setDispo(movie.getDispo());
        dto.setShowtimeEntity(movie.getShowtimeEntities());
        return dto;
    }

    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO getMovieById(Integer id) {
        Optional<MovieEntity> movie = movieRepository.findById(id);
        return movie.map(this::convertToDTO).orElse(null);
    }

    private String saveFile(MultipartFile file) throws Exception {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get("src/main/resources/static/uploads/" + filename);
        Files.write(path, file.getBytes());
        return filename;
    }

    public MovieEntity saveMovie(MovieDTO movieDTO, MultipartFile image,MultipartFile poster) throws Exception {
        MovieEntity movie = new MovieEntity();
        movie.setTitle(movieDTO.getTitle());
        movie.setGenre(movieDTO.getGenre());
        movie.setDescription(movieDTO.getDescription());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setDuration(movieDTO.getDuration());
        movie.setLanguage(movieDTO.getLanguage());
        movie.setCountry(movieDTO.getCountry());
        movie.setDispo(movieDTO.getDispo());

            if (image != null && !image.isEmpty()) {
                String imagePath = saveFile(image);
                movie.setImageUrl("/uploads/" + imagePath);
            }
            if (poster != null && !poster.isEmpty()) {
                String posterPath = saveFile(poster);
                movie.setPosterUrl("/uploads/" + posterPath);
            }

        return movieRepository.save(movie);
    }

    public MovieDTO updateMovie(Integer id, MovieDTO movieDTO,MultipartFile image, MultipartFile poster) {
        Optional<MovieEntity> movieOpt = movieRepository.findById(id);
        if (movieOpt.isPresent()) {
            MovieEntity movie = movieOpt.get();
            movie.setTitle(movieDTO.getTitle());
            movie.setGenre(movieDTO.getGenre());
            movie.setDescription(movieDTO.getDescription());
            movie.setReleaseDate(movieDTO.getReleaseDate());
            movie.setDuration(movieDTO.getDuration());
            movie.setLanguage(movieDTO.getLanguage());
            movie.setCountry(movieDTO.getCountry());
            movie.setDispo(movieDTO.getDispo());

            try {
                if (image != null && !image.isEmpty()) {
                    String imagePath = saveFile(image);
                    movie.setImageUrl("/uploads/" + imagePath);
                }
                if (poster != null && !poster.isEmpty()) {
                    String posterPath = saveFile(poster);
                    movie.setPosterUrl("/uploads/" + posterPath);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            MovieEntity updatedMovie = movieRepository.save(movie);
            return convertToDTO(updatedMovie);
        }
        return null;
    }

    public boolean deleteMovie(Integer id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
