package com.backend.database;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student; // Type is User


    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity classObj;

    @Column(nullable = false)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private TimePeriod timePeriod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

    @ManyToOne
    @JoinColumn(name = "recorded_by", nullable = false)
    private User recordedBy;

    @Column
    private Instant timestamp;

    @PrePersist
    public void prePersist() {
        timestamp = Instant.now();
    }

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column
    private String imagePath;
    @Column
    private String classificationConfidence;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public ClassEntity getClassObj() {
        return classObj;
    }

    public void setClassObj(ClassEntity classObj) {
        this.classObj = classObj;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public TimePeriod getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(TimePeriod timePeriod) {
        this.timePeriod = timePeriod;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public User getRecordedBy() {
        return recordedBy;
    }

    public void setRecordedBy(User recordedBy) {
        this.recordedBy = recordedBy;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getClassificationConfidence() {
        return classificationConfidence;
    }

    public void setClassificationConfidence(String classificationConfidence) {
        this.classificationConfidence = classificationConfidence;
    }
}
