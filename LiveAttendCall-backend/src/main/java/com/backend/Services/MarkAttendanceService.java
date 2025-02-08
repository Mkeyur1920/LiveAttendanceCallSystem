package com.backend.Services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public interface MarkAttendanceService {

    int processAttendance(String className, String section, Date attendanceDate, MultipartFile image, Long periodId);
}
