package com.college;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    static Scanner scanner = new Scanner(System.in);

    static ArrayList<Student> students = new ArrayList<>();

    public static void main(String[] args) {

        while (true) {

            showMenu();

            System.out.print("Enter choice: ");

            String input = scanner.nextLine().trim();

            if (!input.matches("\\d+")) {

                System.out.println("Please enter a number.");
                continue;
            }

            int choice = Integer.parseInt(input);

            switch (choice) {

                case 1:
                    addStudent();
                    break;

                case 2:
                    viewStudents();
                    break;

                case 3:
                    searchStudent();
                    break;

                case 4:
                    searchByCourse();
                    break;

                case 5:
                    analyzeStudentName();
                    break;

                case 6:
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid choice.");
            }
        }
    }

    // ==========================================
    // MENU
    // ==========================================

    static void showMenu() {

        System.out.println();
        System.out.println("==========================================");
        System.out.println("      COLLEGE STUDENT MANAGEMENT");
        System.out.println("==========================================");

        System.out.println("1. Add Student");
        System.out.println("2. View Students");
        System.out.println("3. Search Student");
        System.out.println("4. Search By Course");
        System.out.println("5. Analyze Student Name");
        System.out.println("6. Exit");

        System.out.println("==========================================");
    }

    // ==========================================
    // ADD STUDENT
    // ==========================================

    static void addStudent() {

        System.out.println();
        System.out.println("========== ADD STUDENT ==========");

        System.out.print("Student ID: ");

        String idInput = scanner.nextLine().trim();

        if (!idInput.matches("\\d+")) {

            System.out.println("Invalid Student ID.");
            return;
        }

        int id = Integer.parseInt(idInput);

        System.out.print("Student Name: ");

        String name = scanner.nextLine().trim();

        if (name.isEmpty()) {

            System.out.println("Name cannot be empty.");
            return;
        }

        System.out.print("Age: ");

        String ageInput = scanner.nextLine().trim();

        if (!ageInput.matches("\\d+")) {

            System.out.println("Invalid age.");
            return;
        }

        int age = Integer.parseInt(ageInput);

        System.out.print("Course: ");

        String course = scanner.nextLine().trim();

        if (course.isEmpty()) {

            System.out.println("Course cannot be empty.");
            return;
        }

        System.out.print("Semester: ");

        String semester = scanner.nextLine().trim();

        System.out.print("Email: ");

        String email = scanner.nextLine().trim();

        System.out.print("Phone: ");

        String phone = scanner.nextLine().trim();

        Student student = new Student(
                id,
                name,
                age,
                course,
                semester,
                email,
                phone
        );

        if (!student.isValidEmail()) {

            System.out.println(
                    "Warning: Email format may be invalid."
            );
        }

        students.add(student);

        System.out.println();
        System.out.println("Student added successfully!");
    }

    // ==========================================
    // VIEW STUDENTS
    // ==========================================

    static void viewStudents() {

        System.out.println();
        System.out.println("========== ALL STUDENTS ==========");

        if (students.isEmpty()) {

            System.out.println("No students found.");
            return;
        }

        for (Student student : students) {

            System.out.println(
                    student.getShortInfo()
            );
        }
    }

    // ==========================================
    // SEARCH BY NAME
    // ==========================================

    static void searchStudent() {

        System.out.println();
        System.out.println("========== SEARCH STUDENT ==========");

        System.out.print("Enter name: ");

        String search = scanner.nextLine().trim();

        if (search.isEmpty()) {

            System.out.println("Search cannot be empty.");
            return;
        }

        boolean found = false;

        for (Student student : students) {

            if (student.matchesName(search)) {

                student.displayStudent();

                found = true;
            }
        }

        if (!found) {

            System.out.println("Student not found.");
        }
    }

    // ==========================================
    // SEARCH BY COURSE
    // ==========================================

    static void searchByCourse() {

        System.out.println();
        System.out.println("========== SEARCH COURSE ==========");

        System.out.print("Enter course: ");

        String course = scanner.nextLine().trim();

        boolean found = false;

        for (Student student : students) {

            if (student.matchesCourse(course)) {

                System.out.println(
                        student.getShortInfo()
                );

                found = true;
            }
        }

        if (!found) {

            System.out.println(
                    "No students found for this course."
            );
        }
    }

    // ==========================================
    // STRING ANALYSIS
    // ==========================================

    static void analyzeStudentName() {

        System.out.println();
        System.out.println("========== NAME ANALYSIS ==========");

        System.out.print("Enter student name: ");

        String search = scanner.nextLine().trim();

        for (Student student : students) {

            if (student.matchesName(search)) {

                student.analyzeName();

                return;
            }
        }

        System.out.println("Student not found.");
    }
}