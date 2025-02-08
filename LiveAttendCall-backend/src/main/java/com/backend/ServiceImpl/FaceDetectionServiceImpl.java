package com.backend.ServiceImpl;

import com.backend.Services.FaceDetectionService;

import org.opencv.core.Mat;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.dnn.Dnn;
import org.opencv.dnn.Net;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class FaceDetectionServiceImpl implements FaceDetectionService {
    private static final String YOLO_MODEL_PATH = "yolov8_face.onnx";
    private Net net;

//    public FaceDetectionServiceImpl() {
//        this.net = Dnn.readNetFromONNX(YOLO_MODEL_PATH);
//    }

    @Override
    public List<String> detectFaces(String imagePath) {
        List<String> boundingBoxes = new ArrayList<>();

        Mat image = Imgcodecs.imread(imagePath);




        // Preprocess image for YOLO (resize to 640x640)
        Mat blob = Dnn.blobFromImage(image, 1 / 255.0, new Size(640, 640), new Scalar(0, 0, 0), true, false);
        net.setInput(blob);

        // Run YOLOv8 inference
        Mat output = net.forward();

        // Extract bounding boxes
        for (int i = 0; i < output.rows(); i++) {
            double conf = output.get(i, 4)[0];  // Confidence score
            if (conf > 0.5) {
                double x = output.get(i, 0)[0];
                double y = output.get(i, 1)[0];
                double w = output.get(i, 2)[0];
                double h = output.get(i, 3)[0];

                // Convert to YOLO format (normalized)
                String yoloBox = (x / image.width()) + " " + (y / image.height()) + " " +
                        (w / image.width()) + " " + (h / image.height());
                boundingBoxes.add(yoloBox);
            }
        }
        return boundingBoxes;
    }

    private boolean isBase64Encoded(String str) {
        try {
            Base64.getDecoder().decode(str);
            return true;
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }
}
