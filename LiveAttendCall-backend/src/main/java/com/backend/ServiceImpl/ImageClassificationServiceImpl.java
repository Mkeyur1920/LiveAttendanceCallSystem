package com.backend.ServiceImpl;

import com.backend.Dto.ClassificationResult;
import com.backend.Services.ImageClassificationService;
import org.opencv.dnn.Dnn;
import org.opencv.dnn.Net;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ImageClassificationServiceImpl implements ImageClassificationService {
    private Net net;

    public void ImageClassificationService() throws IOException {
        // Load YOLO model (replace with your model paths)
        String modelConfig = "path/to/yolov3.cfg"; // Path to YOLO config file
        String modelWeights = "path/to/yolov3.weights"; // Path to YOLO weights file

        net = Dnn.readNetFromDarknet(modelConfig, modelWeights);
        net.setPreferableBackend(Dnn.DNN_BACKEND_CUDA); // Use CUDA if available
        net.setPreferableTarget(Dnn.DNN_TARGET_CUDA);
    }
    @Override
    public ClassificationResult classify(String imagePath) {
        return null;
    }
}
