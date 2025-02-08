package com.backend.Dto;


import com.backend.database.Student;

import java.util.List;

public class ClassEntityDTO {  // DTO Class
    private Long id;
    private String className;
    private String section;
    private String classCourse;
    private List<Student> students; // Include students if you need them

    // Constructors (can be empty no-args constructor)
    public ClassEntityDTO() {}

    public ClassEntityDTO(Long id, String className, String section, String classCourse, List<Student> students) {
        this.id = id;
        this.className = className;
        this.section = section;
        this.classCourse = classCourse;
        this.students = students;
    }


    // Getters and setters for all fields EXCEPT attendanceRecords
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getClassCourse() {
        return classCourse;
    }

    public void setClassCourse(String classCourse) {
        this.classCourse = classCourse;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
