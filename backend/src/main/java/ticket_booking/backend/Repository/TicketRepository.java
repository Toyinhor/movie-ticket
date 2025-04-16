package ticket_booking.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ticket_booking.backend.Entity.TicketEntity;
@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Integer> {
}
