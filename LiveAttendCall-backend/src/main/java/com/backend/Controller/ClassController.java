package com.backend.Controller;


import com.backend.Dto.ClassEntityDTO;
import com.backend.Services.ClassService;
import com.backend.database.ClassEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/class")
public class ClassController {
    @Autowired
    private ClassService classService;


    @GetMapping("/getAll")
    public List<ClassEntityDTO> getClasses() {
        return classService.getAllClasses();
    }


    @GetMapping("/getClassById/{id}")
    public ResponseEntity<ClassEntity> getClassById(@PathVariable Long id) {
        Optional<ClassEntity> classes = classService.getClassById(id);
        return classes.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PostMapping("/createClass")
    public ResponseEntity<ClassEntity> createClass(@RequestBody ClassEntity classEntity) {
        return ResponseEntity.ok(classService.createClass(classEntity));
    }

    @PutMapping("/updateClass/{id}")
    public ResponseEntity<ClassEntity> updateClass(@PathVariable Long id, @RequestBody ClassEntity classEntity) {
        return ResponseEntity.ok(classService.updateClass(id, classEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }

}
