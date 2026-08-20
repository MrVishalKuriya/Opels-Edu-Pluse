package com.college.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 16, message = "Age must be at least 16")
    @Max(value = 100, message = "Invalid age")
    private Integer age;

    @NotBlank(message = "Course is required")
    private String course;

    @NotBlank(message = "Semester is required")
    private String semester;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private String status = "Active";

    private Double attendanceRate = 85.0;

    private Double gpa = 3.5;

    private String feeStatus = "Paid";

    public Student() {
    }

    public Student(
            String name,
            Integer age,
            String course,
            String semester,
            String email,
            String phone,
            String status,
            Double attendanceRate,
            Double gpa,
            String feeStatus
    ) {
        this.name = name;
        this.age = age;
        this.course = course;
        this.semester = semester;
        this.email = email;
        this.phone = phone;
        this.status = status != null ? status : "Active";
        this.attendanceRate = attendanceRate != null ? attendanceRate : 85.0;
        this.gpa = gpa != null ? gpa : 3.5;
        this.feeStatus = feeStatus != null ? feeStatus : "Paid";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(Double attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public Double getGpa() {
        return gpa;
    }

    public void setGpa(Double gpa) {
        this.gpa = gpa;
    }

    public String getFeeStatus() {
        return feeStatus;
    }

    public void setFeeStatus(String feeStatus) {
        this.feeStatus = feeStatus;
    }
}