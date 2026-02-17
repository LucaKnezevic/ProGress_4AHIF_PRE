package at.progress.controller;

import at.progress.entity.BodyEntry;
import at.progress.repository.BodyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/body")
@RequiredArgsConstructor
public class BodyController {

    private final BodyRepository repo;

    @GetMapping
    public List<BodyEntry> getAll() {
        return repo.findAllByOrderByDateDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BodyEntry> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BodyEntry create(@RequestBody BodyEntry entry) {
        entry.setId(null);
        return repo.save(entry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BodyEntry> update(@PathVariable Long id, @RequestBody BodyEntry entry) {
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
