package com.backend.Services;

import java.util.List;

public interface FaceDetectionService {
    List<String> detectFaces(String imagePath);
}
