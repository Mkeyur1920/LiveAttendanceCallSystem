package com.backend.Repository;

import com.backend.database.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
//    List<Attendance> findByClassEntityAndAttendanceDate(ClassEntity classEntity, LocalDate attendanceDate);
}
