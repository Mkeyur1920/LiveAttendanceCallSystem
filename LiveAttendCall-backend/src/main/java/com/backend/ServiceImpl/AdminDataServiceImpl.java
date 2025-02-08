package com.backend.ServiceImpl;

import com.backend.Services.AdminDataService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AdminDataServiceImpl implements AdminDataService {

//    @Autowired
//    private AttendanceRepository attendanceRepository;
//
//    @Autowired
//    private ClassRepository classEntityRepository;
    @Override
    public List<Map<String, Object>> getDashboardData(LocalDate date) {
//        List<Map<String, Object>> k = new ArrayList<>();
//        List<ClassEntity> classEntities = classEntityRepository.findAll(); // Or get specific classes if needed.
//
//        k = classEntities.stream().map(classEntity -> {
//            Map<String, Object> dashboardData = new HashMap<>();
//            dashboardData.put("className", classEntity.getClassName());
//            dashboardData.put("section", classEntity.getSection());
//            dashboardData.put("classCourse", classEntity.getClassCourse());
//
//            List<Attendance> attendanceRecords = attendanceRepository.findByClassEntityAndAttendanceDate(classEntity, date);
//
//            long presentCount = 0;
//            long absentCount = 0;
//
//            if (!attendanceRecords.isEmpty()) { // Handle the case where there are no attendance records for the date
//                Attendance attendanceRecord = attendanceRecords.get(0); // Assuming only one attendance record per class per day.
//                presentCount = attendanceRecord.getAttendanceDetails().stream().filter(AttendanceDetail::getPresent).count();
//                absentCount = attendanceRecord.getAttendanceDetails().stream().filter(attendanceDetail -> !attendanceDetail.getPresent()).count();
//            }
//            dashboardData.put("present", presentCount);
//            dashboardData.put("absent", absentCount);
//
//            return dashboardData;
//        }).collect(Collectors.toList());
//        return k;
        return null;
    }
}
