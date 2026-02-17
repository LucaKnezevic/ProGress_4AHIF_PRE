package at.progress.repository;

import at.progress.entity.CalorieEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CalorieRepository extends JpaRepository<CalorieEntry, Long> {
    List<CalorieEntry> findAllByOrderByDateDesc();
}
