import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classService from "../../Services/classService";
import authService from "../../Services/authService";

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    classService.getAllClasses().then((data) => {
      if (data.length === 0) {
        setClasses([
          // { id: 1, className: "10th Grade", section: "A" },
          // { id: 2, className: "9th Grade", section: "B" },
          // { id: 3, className: "8th Grade", section: "C" },
          // { id: 4, className: "7th Grade", section: "D" },
        ]);
      } else {
        debugger;
        console.log(data);
        setClasses(data);
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      classService.deleteClass(id).then(() => loadClasses());
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Classes List</h2>
        <Link to="/classes/add" className="btn btn-primary">
          Add New Class
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Section</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes && Array.isArray(classes) && classes.length > 0 ? ( // Check for existence, array type, AND length
            classes.map((cls, index) => (
              <tr key={cls.id}>
                <td>{index + 1}</td>
                <td>{cls.className}</td>
                <td>{cls.section}</td>
                <td>{cls.classCourse}</td>
                <td>
                  <Link
                    to={`/classes/edit/${cls.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cls.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                {classes === null
                  ? "No classes available"
                  : "Loading classes..."}{" "}
                {/* More informative message */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;
