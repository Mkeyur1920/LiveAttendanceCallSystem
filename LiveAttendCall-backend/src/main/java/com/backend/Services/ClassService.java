package com.backend.Services;


import com.backend.Dto.ClassEntityDTO;
import com.backend.database.ClassEntity;

import java.util.List;
import java.util.Optional;

public interface ClassService {
    ClassEntity createClass(ClassEntity classEntity);
    List<ClassEntityDTO> getAllClasses();
    Optional<ClassEntity> getClassById(Long id);
    ClassEntity updateClass(Long id, ClassEntity classEntity);
    void deleteClass(Long id);
}
