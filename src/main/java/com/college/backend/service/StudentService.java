package com.college.backend.service;

import com.college.backend.dto.StudentStatsDto;
import com.college.backend.entity.Student;
import com.college.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public Student createStudent(Student student) {
        if (repository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email '" + student.getEmail() + "' is already registered");
        }
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student student = getStudentById(id);

        if (!student.getEmail().equalsIgnoreCase(updatedStudent.getEmail()) &&
                repository.existsByEmail(updatedStudent.getEmail())) {
            throw new RuntimeException("Email '" + updatedStudent.getEmail() + "' is already in use by another student");
        }

        student.setName(updatedStudent.getName());
        student.setAge(updatedStudent.getAge());
        student.setCourse(updatedStudent.getCourse());
        student.setSemester(updatedStudent.getSemester());
        student.setEmail(updatedStudent.getEmail());
        student.setPhone(updatedStudent.getPhone());
        student.setStatus(updatedStudent.getStatus());
        student.setAttendanceRate(updatedStudent.getAttendanceRate());
        student.setGpa(updatedStudent.getGpa());
        student.setFeeStatus(updatedStudent.getFeeStatus());

        return repository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        repository.delete(student);
    }

    public List<Student> searchStudents(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllStudents();
        }
        return repository.findByNameContainingIgnoreCase(query.trim());
    }

    public StudentStatsDto getStudentStats() {
        List<Student> students = repository.findAll();
        long total = students.size();
        
        double avgAge = students.stream()
                .mapToInt(Student::getAge)
                .average()
                .orElse(0.0);

        double avgAttendance = students.stream()
                .mapToDouble(s -> s.getAttendanceRate() != null ? s.getAttendanceRate() : 85.0)
                .average()
                .orElse(0.0);

        double avgGpa = students.stream()
                .mapToDouble(s -> s.getGpa() != null ? s.getGpa() : 3.5)
                .average()
                .orElse(0.0);

        long pendingFee = students.stream()
                .filter(s -> "Pending".equalsIgnoreCase(s.getFeeStatus()) || "Partial".equalsIgnoreCase(s.getFeeStatus()))
                .count();

        long paidFee = students.stream()
                .filter(s -> "Paid".equalsIgnoreCase(s.getFeeStatus()))
                .count();

        Map<String, Long> courseCounts = students.stream()
                .collect(Collectors.groupingBy(Student::getCourse, Collectors.counting()));

        return new StudentStatsDto(
                total, 
                Math.round(avgAge * 10.0) / 10.0,
                Math.round(avgAttendance * 10.0) / 10.0,
                Math.round(avgGpa * 100.0) / 100.0,
                pendingFee,
                paidFee,
                courseCounts
        );
    }
}