package ticket_booking.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ticket_booking.backend.DTO.TicketDTO;
import ticket_booking.backend.Entity.TicketEntity;
import ticket_booking.backend.Service.TicketService;

@RestController
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketEntity> addTicket(@RequestBody TicketDTO ticketDTO) {
        return ResponseEntity.ok(ticketService.save(ticketDTO));
    }
}
