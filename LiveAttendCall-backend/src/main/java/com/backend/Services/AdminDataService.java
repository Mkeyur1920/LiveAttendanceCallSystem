package com.backend.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface AdminDataService {
    List<Map<String, Object>> getDashboardData(LocalDate date);
}
