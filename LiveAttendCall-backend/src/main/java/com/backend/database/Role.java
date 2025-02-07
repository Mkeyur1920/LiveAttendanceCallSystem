package com.backend.database;

public enum Role {
    ADMIN,   // Full access to manage users, classes, and attendance
    TEACHER, // Can manage classes, students, and mark attendance
    STUDENT  // Can view attendance records and profile details
}

