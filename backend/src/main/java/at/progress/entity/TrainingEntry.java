package at.progress.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "training_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String exercise;

    private int sets;

    private int reps;

    private double weightKg;
}
