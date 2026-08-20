package com.college.backend.config;

import com.college.backend.entity.Faculty;
import com.college.backend.entity.Notice;
import com.college.backend.entity.Student;
import com.college.backend.repository.FacultyRepository;
import com.college.backend.repository.NoticeRepository;
import com.college.backend.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final NoticeRepository noticeRepository;

    public DataInitializer(
            StudentRepository studentRepository, 
            FacultyRepository facultyRepository,
            NoticeRepository noticeRepository
    ) {
        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.noticeRepository = noticeRepository;
    }

    @Override
    public void run(String... args) {
        if (studentRepository.count() == 0) {
            List<Student> sampleStudents = List.of(
                new Student("Aarav Sharma", 20, "Computer Science", "Semester 4", "aarav.sharma@college.edu", "+91 9876543210", "Active", 92.5, 3.85, "Paid"),
                new Student("Priya Patel", 19, "Information Technology", "Semester 2", "priya.patel@college.edu", "+91 9876543211", "Active", 88.0, 3.60, "Paid"),
                new Student("Rohan Mehta", 21, "Computer Science", "Semester 6", "rohan.mehta@college.edu", "+91 9876543212", "Active", 95.0, 3.92, "Paid"),
                new Student("Ananya Iyer", 20, "Data Science", "Semester 4", "ananya.iyer@college.edu", "+91 9876543213", "Active", 78.5, 3.40, "Pending"),
                new Student("Vikram Singh", 22, "Business Administration", "Semester 6", "vikram.singh@college.edu", "+91 9876543214", "Active", 84.0, 3.55, "Paid"),
                new Student("Sneha Verma", 18, "Electrical Engineering", "Semester 1", "sneha.verma@college.edu", "+91 9876543215", "Active", 91.0, 3.70, "Paid"),
                new Student("Kabir Das", 19, "Information Technology", "Semester 3", "kabir.das@college.edu", "+91 9876543216", "Active", 82.5, 3.25, "Pending"),
                new Student("Diya Joshi", 21, "Data Science", "Semester 5", "diya.joshi@college.edu", "+91 9876543217", "Active", 96.0, 3.95, "Paid"),
                new Student("Aditya Deshmukh", 20, "Mechanical Engineering", "Semester 4", "aditya.d@college.edu", "+91 9876543218", "Active", 89.0, 3.65, "Paid"),
                new Student("Neha Kulkarni", 19, "Computer Science", "Semester 2", "neha.k@college.edu", "+91 9876543219", "Active", 87.5, 3.50, "Paid")
            );

            studentRepository.saveAll(sampleStudents);
            System.out.println("Initialized database with " + sampleStudents.size() + " sample students.");
        }

        if (facultyRepository.count() == 0) {
            List<Faculty> sampleFaculty = List.of(
                new Faculty("Dr. Rajesh Kumar", "Computer Science", "Head of Department & Professor", "rajesh.kumar@college.edu", "+91 9800011122", "Mon/Wed 10:00 AM - 12:00 PM"),
                new Faculty("Prof. Meera Nair", "Information Technology", "Associate Professor", "meera.nair@college.edu", "+91 9800011123", "Tue/Thu 02:00 PM - 04:00 PM"),
                new Faculty("Dr. Amitav Ghosh", "Data Science", "Professor", "amitav.ghosh@college.edu", "+91 9800011124", "Mon/Fri 11:00 AM - 01:00 PM"),
                new Faculty("Prof. Sunita Reddy", "Business Administration", "Dean & Senior Professor", "sunita.reddy@college.edu", "+91 9800011125", "Wed/Fri 03:00 PM - 05:00 PM"),
                new Faculty("Dr. Vikramaditya Rao", "Electrical Engineering", "Assistant Professor", "vikram.rao@college.edu", "+91 9800011126", "Tue/Thu 10:00 AM - 12:00 PM")
            );

            facultyRepository.saveAll(sampleFaculty);
            System.out.println("Initialized database with " + sampleFaculty.size() + " faculty members.");
        }

        if (noticeRepository.count() == 0) {
            List<Notice> sampleNotices = List.of(
                new Notice("End-Semester Midterm Examination Timetable Released", "Exams", "The midterm examination timetable for all undergraduate and postgraduate semesters is now published. Exams begin next Monday.", "Controller of Examinations", true),
                new Notice("Tuition Fee Clearance Notice for Current Semester", "Financial", "Students with pending semester fees are advised to settle outstanding dues before Friday to avoid late fine surcharges.", "Accounts Office", false),
                new Notice("Annual Campus Hackathon & Tech Fest Registration Open", "Events", "Register your teams for the annual EduPulse Tech Fest 2026! Cash prizes worth $5,000 up for grabs across AI, Web, and Robotics categories.", "Student Affairs Council", false)
            );

            noticeRepository.saveAll(sampleNotices);
            System.out.println("Initialized database with " + sampleNotices.size() + " campus notices.");
        }
    }
}
