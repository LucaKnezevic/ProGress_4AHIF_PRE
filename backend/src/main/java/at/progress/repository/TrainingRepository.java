package at.progress.repository;

import at.progress.entity.TrainingEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrainingRepository extends JpaRepository<TrainingEntry, Long> {
    List<TrainingEntry> findAllByOrderByDateDesc();
}
