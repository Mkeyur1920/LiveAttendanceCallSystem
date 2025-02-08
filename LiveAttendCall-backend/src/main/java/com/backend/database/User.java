package com.backend.database;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "users_table")
public class    User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String profilePicture;

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

//    @Column(columnDefinition = "TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'")
//    private LocalDateTime registrationDate;
    @Column(name = "registration_date")
    private Instant registrationDate;

    @Column
    private boolean isActive;

//    @Enumerated(EnumType.STRING)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role userRole;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Student student;

    @OneToMany(mappedBy = "student") // mappedBy "student" in User
    private List<Attendance> attendances;


    @ManyToOne  // Many users to one class
    @JoinColumn(name = "class_id") // Foreign key column
    private ClassEntity cls;



    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime lastUpdated;

    // Getters and Setters


    public List<Attendance> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }

    public ClassEntity getCls() {
        return cls;
    }

    public void setCls(ClassEntity cls) {
        this.cls = cls;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    @PrePersist
    public void prePersist() {
        registrationDate = Instant.now();
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Role getUserRole() {
        return userRole;
    }

    public void setUserRole(Role userRole) {
        this.userRole = userRole;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}

