package ticket_booking.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticket_booking.backend.DTO.ShowtimeDTO;
import ticket_booking.backend.Entity.ShowtimeEntity;
import ticket_booking.backend.Repository.ShowtimeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowtimeService {
    @Autowired
    ShowtimeRepository showtimeRepository;

    private List<ShowtimeEntity> findAllByMovie_id(Integer movie_id) {
        return showtimeRepository.findAllByMovie_Id(movie_id);
    }

    public ShowtimeEntity createNewShowtime(ShowtimeDTO dto){
        List<ShowtimeEntity> show = findAllByMovie_id(dto.getMovie_id());
        for(ShowtimeEntity s: show){
            if(s.getShowtime().equals(dto.getShowtime())
                    && s.getDate().equals(dto.getDate())){
                return null;
            }
        }

        ShowtimeEntity showtimeEntity = new ShowtimeEntity();
        showtimeEntity.setMovie_id(dto.getMovie_id());
        showtimeEntity.setDate(dto.getDate());
        showtimeEntity.setShowtime(dto.getShowtime());
        return showtimeRepository.save(showtimeEntity);
    }

    public boolean deleteShowtime(ShowtimeDTO dto) {
        List<ShowtimeEntity> show = findAllByMovie_id(dto.getMovie_id());
        for(ShowtimeEntity s: show){
            if (s.getDate().equals(dto.getDate())
            && s.getShowtime().equals(dto.getShowtime())
            && s.getMovie_id().equals(dto.getMovie_id())
            ){
                showtimeRepository.delete(s);
                return true;
            }
        }
        return false;
    }

    public List<LocalDate> getShowDatesByMovieId(Integer movieId) {
        List<ShowtimeEntity> show = findAllByMovie_id(movieId);
        List<LocalDate> date = show.stream().map(s -> s.getDate())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
         return date;
    }

    public List<LocalTime> getAllTimeByMovieIdAndDate(Integer movie_id, LocalDate date) {
        List<ShowtimeEntity> show = showtimeRepository.findAllByMovie_idAndDate(movie_id, date);
        List<LocalTime> time = show.stream().map(s->s.getShowtime())
                .sorted()
                .collect(Collectors.toList());
        return time;
    }

}
