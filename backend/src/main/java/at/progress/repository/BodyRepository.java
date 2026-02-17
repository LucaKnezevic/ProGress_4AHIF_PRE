package at.progress.repository;

import at.progress.entity.BodyEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BodyRepository extends JpaRepository<BodyEntry, Long> {
    List<BodyEntry> findAllByOrderByDateDesc();
}
