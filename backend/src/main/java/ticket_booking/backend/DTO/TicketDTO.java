package ticket_booking.backend.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
@Data
public class TicketDTO implements Serializable {
    private Integer id;
    private Integer userId;
    private Integer showtimeId;
    private Integer seat;
    private BigDecimal price;
}
