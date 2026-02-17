package at.progress.controller;

import at.progress.entity.TrainingEntry;
import at.progress.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingRepository repo;

    @GetMapping
    public List<TrainingEntry> getAll() {
        return repo.findAllByOrderByDateDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingEntry> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TrainingEntry create(@RequestBody TrainingEntry entry) {
        entry.setId(null);
        return repo.save(entry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainingEntry> update(@PathVariable Long id, @RequestBody TrainingEntry entry) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entry.setId(id);
        return ResponseEntity.ok(repo.save(entry));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
