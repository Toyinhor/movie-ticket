package ticket_booking.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ticket_booking.backend.Entity.ShowtimeEntity;

import java.time.LocalDate;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<ShowtimeEntity, Integer> {

    List<ShowtimeEntity> findAllByMovie_Id(Integer movieId);

    List<ShowtimeEntity> findAllByMovie_idAndDate(Integer movieId, LocalDate date);

}
