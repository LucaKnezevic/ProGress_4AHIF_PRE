package at.progress.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "body_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BodyEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private double weightKg;

    private Double bodyFatPercent;

    private Double waistCm;
}
