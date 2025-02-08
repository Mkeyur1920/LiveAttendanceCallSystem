import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studentService from "../../Services/studentService";
import classService from "../../Services/classService";

const AddEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("");
  const [classes, setClasses] = useState([]);

  const [sections, setSections] = useState([]);
  const [distinctClassNames, setDistinctClassNames] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    className: "",
  });

  useEffect(() => {
    classService.getAllClasses().then((data) => {
      setClasses(data);
      const uniqueClassNames = Array.from(
        new Set(data.map((cls) => cls.className))
      );
      setDistinctClassNames(uniqueClassNames);
    });
    if (id) {
      studentService.getStudentById(id).then((data) => setStudent(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };
  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);
    if (selectedClassName) {
      classService
        .getSectionsByClassName(selectedClassName)
        .then((data) => setSections(data));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      studentService.updateStudent(id, student).then(() => {
        navigate("/students/edit" + id);
      });
    } else {
      studentService.createStudent(student).then(() => {
        navigate("/students");
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="eg. Mayur Jayesh Pathak"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="text"
            placeholder="eg. 101B1234"
            className="form-control"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Class</label>
          <input
            type="text"
            placeholder="select"
            className="form-control"
            name="className"
            value={student.className}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="mb-3">
          <label className="form-label">Select Class</label>
          <select
            className="form-select"
            value={selectedClass}
            onChange={handleClassChange}
            required
          >
            <option value="">Select a class</option>
            {distinctClassNames.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Select Section</label>
          <select
            className="form-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            required
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/students")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditStudent;
