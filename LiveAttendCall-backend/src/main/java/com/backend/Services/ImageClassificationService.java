package com.backend.Services;


import com.backend.Dto.ClassificationResult;

import java.io.IOException;

public interface ImageClassificationService {
    ClassificationResult classify(String imagePath) throws IOException;
}
