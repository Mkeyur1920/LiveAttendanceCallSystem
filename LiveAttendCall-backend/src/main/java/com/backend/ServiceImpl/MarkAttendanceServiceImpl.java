package com.backend.ServiceImpl;

import com.backend.Repository.AttendanceRepository;
import com.backend.Repository.ClassRepository;
import com.backend.Repository.TimePeriodRepository;
import com.backend.Repository.UserRepository;
import com.backend.Services.MarkAttendanceService;
import com.backend.database.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class MarkAttendanceServiceImpl implements MarkAttendanceService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;



    @Autowired
    private TimePeriodRepository timePeriodRepository;
    @Override
    public int processAttendance(String className, String section, Date attendanceDate, MultipartFile image, Long periodId) {

        ClassEntity cls = classRepository.findByClassNameAndSection(className, section)
                .orElseThrow(() -> new EntityNotFoundException("Class not found"));

        // 2. Find the TimePeriod
        TimePeriod timePeriod = timePeriodRepository.findById(periodId)
                .orElseThrow(() -> new EntityNotFoundException("Time period not found"));

        // 3. Get the students for this class and section
        List<User> students = userRepository.findByUserRoleAndClass(Role.STUDENT, cls);

        int presentCount = 0; // Initialize present count

        // 4. Process each student's attendance (image classification, etc.)
        for (User student : students) {
            // Example image classification (replace with your actual logic)
//             String imagePath = imageClassificationService.classifyImage(image);
//             double confidence = imageClassificationService.getConfidence();
            String status = "present"; // Default status (replace with image classification result)

            // Example: Check if the student is present based on the image classification
//             if (confidence > 0.8) { // Example threshold
//                 status = "present";
//                 presentCount++;
//             } else {
//                 status = "absent";
//             }

            // For this example, we'll assume all students in the class are present
            status = "present"; // Replace with actual image classification result
            presentCount++;

            Attendance attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setClassObj(cls);
            attendance.setDate(attendanceDate);
            attendance.setTimePeriod(timePeriod);
            attendance.setStatus(AttendanceStatus.valueOf(status));
//             attendance.setImagePath(imagePath);
//             attendance.setClassificationConfidence(confidence);

            attendanceRepository.save(attendance);
        }

        return presentCount;
        //        return 0;
    }
}
