package com.backend.Controller;


import com.backend.Services.DatasetGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/dataset")
public class DatasetGeneratorController {

    @Autowired
    private DatasetGeneratorService datasetGeneratorService;

    @GetMapping("/generate")
    public ResponseEntity<String> generateDataset() {
        try {
            datasetGeneratorService.generateDataset();
            return ResponseEntity.ok("Dataset generated successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating dataset.");
        }
    }
}
