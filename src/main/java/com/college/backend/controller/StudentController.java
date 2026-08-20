package com.college.backend.controller;

import com.college.backend.dto.StudentStatsDto;
import com.college.backend.entity.Student;
import com.college.backend.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // GET ALL STUDENTS
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }

    // GET STATS (TOTAL, AVG AGE, COURSE BREAKDOWN)
    @GetMapping("/stats")
    public ResponseEntity<StudentStatsDto> getStats() {
        return ResponseEntity.ok(service.getStudentStats());
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(service.getStudentById(id));
    }

    // CREATE STUDENT
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createStudent(student));
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student
    ) {
        return ResponseEntity.ok(service.updateStudent(id, student));
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    // SEARCH STUDENTS BY NAME
    @GetMapping("/search")
    public ResponseEntity<List<Student>> search(@RequestParam(required = false, defaultValue = "") String name) {
        return ResponseEntity.ok(service.searchStudents(name));
    }
}