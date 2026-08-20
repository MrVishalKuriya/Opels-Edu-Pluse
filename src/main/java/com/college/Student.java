package com.college;

public class Student {

    private int id;
    private String name;
    private int age;
    private String email;
    private String course;
    private String phone;
    private String city;

    // Default constructor
    public Student() {
    }

    // Constructor used by Main.java
    public Student(
            int id,
            String name,
            int age,
            String email,
            String course,
            String phone,
            String city) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.course = course;
        this.phone = phone;
        this.city = city;
    }

    // Getters

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public String getCourse() {
        return course;
    }

    public String getPhone() {
        return phone;
    }

    public String getCity() {
        return city;
    }

    // Setters

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Validate email
    public boolean isValidEmail() {

        if (email == null || email.isEmpty()) {
            return false;
        }

        return email.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
        );
    }

    // Short student information
    public String getShortInfo() {

        return id + " | "
                + name + " | "
                + course + " | "
                + email;
    }

    // Search student by name
    public boolean matchesName(String searchName) {

        if (searchName == null || name == null) {
            return false;
        }

        return name.toLowerCase()
                .contains(searchName.toLowerCase());
    }

    // Search student by course
    public boolean matchesCourse(String searchCourse) {

        if (searchCourse == null || course == null) {
            return false;
        }

        return course.toLowerCase()
                .contains(searchCourse.toLowerCase());
    }

    // Display complete student information
    public void displayStudent() {

        System.out.println("--------------------------------");
        System.out.println("Student ID : " + id);
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
        System.out.println("Email      : " + email);
        System.out.println("Course     : " + course);
        System.out.println("Phone      : " + phone);
        System.out.println("City       : " + city);
        System.out.println("--------------------------------");
    }

    // Analyze name
    public String analyzeName() {

        if (name == null || name.trim().isEmpty()) {
            return "Name is empty";
        }

        String cleanName = name.trim();

        String[] parts = cleanName.split("\\s+");

        String firstName = parts[0];

        String lastName = "";

        if (parts.length > 1) {
            lastName = parts[parts.length - 1];
        }

        return "First Name: " + firstName
                + ", Last Name: " + lastName
                + ", Characters: " + cleanName.length()
                + ", Words: " + parts.length;
    }

    @Override
    public String toString() {

        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", course='" + course + '\'' +
                ", phone='" + phone + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}