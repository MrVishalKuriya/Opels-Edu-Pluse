package com.college.backend.controller;

import com.college.backend.entity.Notice;
import com.college.backend.repository.NoticeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class NoticeController {

    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeRepository.findAllByOrderByDatePostedDescIdDesc());
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@Valid @RequestBody Notice notice) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noticeRepository.save(notice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        noticeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
