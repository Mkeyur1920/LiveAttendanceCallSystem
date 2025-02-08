import React, { useEffect, useState } from "react";
import studentService from "../../Services/studentService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    studentService.getAllStudents().then((data) => {
      if (data.length === 0) {
        // Add sample data if no data exists
        const sampleData = [
          // { id: 1, name: "John Doe", rollNumber: "101", className: "10th A" },
          // { id: 2, name: "Jane Smith", rollNumber: "102", className: "10th A" },
          // { id: 3, name: "Sam Wilson", rollNumber: "103", className: "10th A" },
          // { id: 4, name: "Lisa Ray", rollNumber: "104", className: "10th A" },
        ];
        setStudents(sampleData);
      } else {
        console.log(data);
        setStudents(data);
      }
    });
  }, []);

  const handleAddStudent = () => {
    navigate("/students/add");
  };

  const handleEditStudent = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      studentService.deleteStudent(id).then(() => {
        setStudents(students.filter((student) => student.id !== id));
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student List</h2>
        <Link to="/students/add" className="btn btn-primary">
          Add Student
        </Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Section</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.rollNumber}</td>
                <td>{student.classId.section}</td>
                <td>{student.classId.className}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEditStudent(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Students available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
