package com.college.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "notices")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Notice title is required")
    private String title;

    @NotBlank(message = "Category is required")
    private String category; // e.g. "Academic", "Exams", "Events", "General"

    @Column(length = 2000, nullable = false)
    @NotBlank(message = "Content is required")
    private String content;

    private LocalDate datePosted = LocalDate.now();

    private String postedBy = "Campus Admin";

    private boolean urgent = false;

    public Notice() {
    }

    public Notice(String title, String category, String content, String postedBy, boolean urgent) {
        this.title = title;
        this.category = category;
        this.content = content;
        this.postedBy = postedBy != null ? postedBy : "Campus Admin";
        this.urgent = urgent;
        this.datePosted = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public boolean isUrgent() {
        return urgent;
    }

    public void setUrgent(boolean urgent) {
        this.urgent = urgent;
    }
}
