package com.college.backend.repository;

import com.college.backend.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    List<Faculty> findByDepartmentIgnoreCase(String department);
}
