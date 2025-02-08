import React, { useState, useEffect } from "react";
import classService from "../../Services/classService";
import attendanceService from "../../Services/attendanceService";
import moment from "moment"; // Import moment for date formatting
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap"; // Import React-Bootstrap components

const MarkAttendance = () => {
  const [classes, setClasses] = useState([
    { className: "10th A", classCourse: "Math", sections: ["A", "B"] },
    { className: "10th B", classCourse: "Science", sections: ["A", "B", "C"] },
    { className: "11th A", classCourse: "Physics", sections: ["A"] },
    { className: "12th A", classCourse: "Chemistry", sections: ["A", "B"] },
  ]); // Sample Class Data
  const [sections, setSections] = useState([]);
  const [distinctClassNames, setDistinctClassNames] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    moment().format("YYYY-MM-DD ")
  ); // Initialize with today's date
  const [image, setImage] = useState(null);
  const [periods, setPeriods] = useState([]); // State for time periods
  const [selectedPeriod, setSelectedPeriod] = useState(""); // State for the selected period

  // useEffect(() => {
  //   classService.getAllClasses().then((data) => {
  //     setClasses(data);
  //     const uniqueClassNames = Array.from(
  //       new Set(data.map((cls) => cls.className))
  //     );
  //     setDistinctClassNames(uniqueClassNames);
  //   });
  // }, []);

  useEffect(() => {
    const selectedClassData = classes.find(
      (cls) => cls.className === selectedClass
    );
    if (selectedClassData) {
      setSections(selectedClassData.sections);
      // Generate periods (1 to 5)
      setPeriods(
        Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          periodNumber: i + 1,
        }))
      );
    } else {
      setSections([]);
      setPeriods([]);
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);
    setSelectedSection(""); // Reset section when class changes
    setSelectedPeriod(""); // Reset period when class changes
    // if (selectedClassName) {
    //   classService
    //     .getSectionsByClassName(selectedClassName)
    //     .then((data) => setSections(data));
    // }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCaptureImage = async () => {
    try {
      const video = document.createElement("video");
      video.style.display = "none"; // Hide the video element
      document.body.appendChild(video); // Add it to the DOM (but hidden)

      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Get camera access
      video.srcObject = stream;
      await video.play(); // Wait for the video to start playing

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to video dimensions *after* video starts playing
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw the current frame

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      ); // Convert to Blob

      setImage(new File([blob], "captured.png", { type: "image/png" })); // Create File object

      stream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
      document.body.removeChild(video); // Remove the video element
    } catch (error) {
      console.error("Error capturing image:", error);
      alert(
        "Error capturing image. Please make sure you have a camera and allow access."
      ); // User-friendly error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedClass ||
      !selectedSection ||
      !attendanceDate ||
      !image ||
      !selectedPeriod
    ) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("classId", selectedClass);
    formData.append("section", selectedSection);
    formData.append("attendanceDate", attendanceDate);
    formData.append("image", image);
    formData.append("periodId", selectedPeriod); // Add the periodId to the form data

    attendanceService
      .processAttendance(formData)
      .then(() => {
        alert("Attendance processed successfully!");
        // Reset the form after successful submission
        setSelectedClass("");
        setSelectedSection("");
        setAttendanceDate(moment().format("YYYY-MM-DD")); // Reset to today's date
        setImage(null);
        setSelectedPeriod("");
      })
      .catch((error) => {
        console.error("Error processing attendance:", error);
        alert("Error processing attendance. Please try again."); // Or a more user-friendly message
      });
  };

  return (
    <Container className="mt-4">
      <h2>Mark Attendance</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Class</Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={handleClassChange}
                required
              >
                <option value="">Select a class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls.className}>
                    {cls.className} ({cls.classCourse}){" "}
                    {/* Display class and course */}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Section</Form.Label>
              <Form.Select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                required
              >
                <option value="">Select a section</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Attendance Date</Form.Label>
              <Form.Control
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Period</Form.Label>
              <Form.Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                required
              >
                <option value="">Select a period</option>
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.periodNumber}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Upload or Capture Image</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button
              variant="primary"
              className="ms-3"
              onClick={handleCaptureImage}
            >
              Capture Image
            </Button>
          </div>
        </Form.Group>
        {image && (
          <Form.Group className="mb-3">
            <Form.Label>Preview:</Form.Label>
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              thumbnail
              style={{ maxWidth: "200px" }}
            />
          </Form.Group>
        )}
        <Button type="submit" variant="primary">
          Process Attendance
        </Button>
      </Form>
    </Container>
  );
};

export default MarkAttendance;
