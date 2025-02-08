package com.backend.Controller;


import com.backend.Services.MarkAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RestController
@RequestMapping("/api/attendance")
public class MarkAttendanceController {

    @Autowired
    private MarkAttendanceService markAttendanceService;

    @PostMapping("/process-attendance")
    public ResponseEntity<?> processAttendance(
            @RequestParam("classId") String className, // Use String for className
            @RequestParam("section") String section,
            @RequestParam("attendanceDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date attendanceDate,
            @RequestParam("image") MultipartFile image,
            @RequestParam("periodId") Long periodId) {

        try {
            markAttendanceService.processAttendance(className, section, attendanceDate, image, periodId);
            return ResponseEntity.ok().build(); // 200 OK on success
        } catch (Exception e) {
            // Handle exceptions appropriately (log, return error response)
            System.err.println("Error processing attendance: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing attendance"); // 500 error
        }
    }

}
