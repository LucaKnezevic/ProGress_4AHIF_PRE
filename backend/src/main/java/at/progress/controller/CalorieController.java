package at.progress.controller;

import at.progress.entity.CalorieEntry;
import at.progress.repository.CalorieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calories")
@RequiredArgsConstructor
public class CalorieController {

    private final CalorieRepository repo;

    @GetMapping
    public List<CalorieEntry> getAll() {
        return repo.findAllByOrderByDateDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalorieEntry> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CalorieEntry create(@RequestBody CalorieEntry entry) {
        entry.setId(null);
        return repo.save(entry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CalorieEntry> update(@PathVariable Long id, @RequestBody CalorieEntry entry) {
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
