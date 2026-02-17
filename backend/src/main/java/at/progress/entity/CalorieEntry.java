package at.progress.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "calorie_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalorieEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private int calories;

    private String note;
}
