package com.college.backend.dto;

import java.util.Map;

public class StudentStatsDto {
    private long totalStudents;
    private double averageAge;
    private double avgAttendanceRate;
    private double avgGpa;
    private long pendingFeeCount;
    private long paidFeeCount;
    private Map<String, Long> courseCounts;

    public StudentStatsDto() {
    }

    public StudentStatsDto(
            long totalStudents, 
            double averageAge, 
            double avgAttendanceRate,
            double avgGpa,
            long pendingFeeCount,
            long paidFeeCount,
            Map<String, Long> courseCounts
    ) {
        this.totalStudents = totalStudents;
        this.averageAge = averageAge;
        this.avgAttendanceRate = avgAttendanceRate;
        this.avgGpa = avgGpa;
        this.pendingFeeCount = pendingFeeCount;
        this.paidFeeCount = paidFeeCount;
        this.courseCounts = courseCounts;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(double averageAge) {
        this.averageAge = averageAge;
    }

    public double getAvgAttendanceRate() {
        return avgAttendanceRate;
    }

    public void setAvgAttendanceRate(double avgAttendanceRate) {
        this.avgAttendanceRate = avgAttendanceRate;
    }

    public double getAvgGpa() {
        return avgGpa;
    }

    public void setAvgGpa(double avgGpa) {
        this.avgGpa = avgGpa;
    }

    public long getPendingFeeCount() {
        return pendingFeeCount;
    }

    public void setPendingFeeCount(long pendingFeeCount) {
        this.pendingFeeCount = pendingFeeCount;
    }

    public long getPaidFeeCount() {
        return paidFeeCount;
    }

    public void setPaidFeeCount(long paidFeeCount) {
        this.paidFeeCount = paidFeeCount;
    }

    public Map<String, Long> getCourseCounts() {
        return courseCounts;
    }

    public void setCourseCounts(Map<String, Long> courseCounts) {
        this.courseCounts = courseCounts;
    }
}
