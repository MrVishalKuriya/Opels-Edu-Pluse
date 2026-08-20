package com.college.backend.repository;

import com.college.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository
        extends JpaRepository<Student, Long> {

    List<Student> findByNameContainingIgnoreCase(String name);

    List<Student> findByCourseIgnoreCase(String course);

    List<Student> findBySemesterIgnoreCase(String semester);

    boolean existsByEmail(String email);
}