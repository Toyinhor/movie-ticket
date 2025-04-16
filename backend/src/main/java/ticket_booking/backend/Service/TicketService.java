package ticket_booking.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticket_booking.backend.DTO.TicketDTO;
import ticket_booking.backend.Entity.TicketEntity;
import ticket_booking.backend.Repository.TicketRepository;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;

    public TicketEntity save(TicketDTO ticketDTO) {
        TicketEntity ticketEntity = new TicketEntity();
        ticketEntity.setUserId(ticketDTO.getUserId());
        ticketEntity.setShowtimeId(ticketDTO.getShowtimeId());
        ticketEntity.setSeat(ticketDTO.getSeat());
        ticketEntity.setPrice(ticketDTO.getPrice());
        return ticketRepository.save(ticketEntity);
    }

}
