package com.backend.ServiceImpl;

import com.backend.Repository.UserRepository;
import com.backend.Services.DatasetGeneratorService;
import com.backend.database.Role;
import com.backend.database.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

@Service
public class DatasetGeneratorServiceImpl implements DatasetGeneratorService {

    private static final String DATASET_PATH = "dataset/";

    private static final String SOURCE_PATH ="upload/";

    private static final double TRAIN_SPLIT_RATIO = 0.8; // 80% train, 20% val


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FaceDetectionServiceImpl faceDetectionService; // Detect bounding boxes


    @Override
    public void generateDataset() throws IOException {

        List<User> students = userRepository.findByUserRole(Role.STUDENT);
        if (students.isEmpty()) {
            System.out.println("No student data found!");
            return;
        }

        createDirectories();
        Random random = new Random();
        int totalStudents = students.size();
        int trainCount = (int) (totalStudents * TRAIN_SPLIT_RATIO);


        for (int i = 0; i < totalStudents; i++) {
            User student = students.get(i);
            boolean isTrain = i < trainCount;
            String subFolder = isTrain ? "train" : "val";




            String imageDestPath = DATASET_PATH + "images/" + subFolder + "/" + student.getId() + ".jpg";
            Path destinationPath = Paths.get(imageDestPath);
            if(Files.exists(destinationPath)){
                Files.delete(destinationPath);
                System.out.println("Existing image deleted: " + imageDestPath);
            }
            if(!student.getProfilePicture().isEmpty()){
                Files.copy(Paths.get(student.getProfilePicture()), Paths.get(imageDestPath));
            }



            // Generate YOLO annotation file
            String labelFilePath = DATASET_PATH + "labels/" + subFolder + "/" + student.getId() + ".txt";
            List<String> boundingBoxes = faceDetectionService.detectFaces(imageDestPath);
            writeAnnotations(labelFilePath, boundingBoxes);
        }

        createDataYAML();
        System.out.println("Dataset generated successfully!");




    }

    private void writeAnnotations(String filePath, List<String> boundingBoxes) throws IOException {
        FileWriter writer = new FileWriter(filePath);
        for (String box : boundingBoxes) {
            writer.write("0 " + box + "\n"); // Class ID (0 = student)
        }
        writer.close();
    }

    private void createDataYAML() throws IOException {
        String yamlContent = """
        path: dataset
        train: images/train
        val: images/val

        names:
          0: student
        """;

        Files.write(Paths.get(DATASET_PATH + "data.yaml"), yamlContent.getBytes());
    }

    private void createDirectories() {
        String[] dirs = {
                "images/train", "images/val",
                "labels/train", "labels/val"
        };
        for (String dir : dirs) {
            new File(DATASET_PATH + dir).mkdirs();
        }
    }
}
