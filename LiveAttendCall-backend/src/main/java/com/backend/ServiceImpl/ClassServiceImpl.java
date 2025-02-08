package com.backend.ServiceImpl;

import com.backend.Dto.ClassEntityDTO;
import com.backend.Repository.ClassRepository;
import com.backend.Services.ClassService;
import com.backend.database.ClassEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClassServiceImpl implements ClassService {
    @Autowired
    private ClassRepository classRepository;


    @Override
    public ClassEntity createClass(ClassEntity classEntity) {
        return classRepository.save(classEntity);
    }

    @Override
    public List<ClassEntityDTO> getAllClasses() {
        List<ClassEntity> classEntities = classRepository.findAll();
        ClassEntityDTO classEntityDTO = new ClassEntityDTO();
        List<ClassEntityDTO> classEntityDTOs = classEntities.stream()
//                .map(classEntity -> modelMapper.map(classEntity, ClassEntityDTO.class)) // ModelMapper
                // OR, if NOT using ModelMapper:
                 .map(this::convertToDto) // Your manual conversion method (see below)
                .collect(Collectors.toList());

        return classEntityDTOs;
    }

    private ClassEntityDTO convertToDto(ClassEntity classEntity) {
        ClassEntityDTO dto = new ClassEntityDTO();
        dto.setId(classEntity.getId());
        dto.setClassName(classEntity.getClassName());
        dto.setSection(classEntity.getSection());
        dto.setClassCourse(classEntity.getClassCourse());
//        dto.setStudents(classEntity.getStudents());
        return dto;
    }

    @Override
    public Optional<ClassEntity> getClassById(Long id) {
        return Optional.ofNullable(classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found")));
    }

    @Override
    public ClassEntity updateClass(Long id, ClassEntity classEntity) {
        Optional<ClassEntity> existingClass = getClassById(id);
        ClassEntity classEntity1 = existingClass.get();
        classEntity1.setClassName(classEntity.getClassName());
        classEntity1.setSection(classEntity.getSection());
        return classRepository.save(classEntity1);
    }

    @Override
    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}
