import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classService from "../../Services/classService";

const AddEditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classes, setClass] = useState({
    className: "",
    classSection: "",
    courseName: "",
  });

  useEffect(() => {
    if (id) {
      classService.getClassById(id).then((data) => setClass(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClass({ ...classes, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      classService.updateClass(id, classes).then(() => {
        navigate("/classes/edit/" + id);
      });
    } else {
      classService.createClass(classes).then(() => {
        navigate("/classes");
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Class" : "Add Class"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Class Name</label>
          <input
            type="text"
            placeholder="eg. 11"
            className="form-control"
            name="className"
            value={classes.className}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Class Section </label>
          <input
            type="text"
            placeholder="eg. B"
            className="form-control"
            name="section"
            value={classes.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Class Course</label>
          <input
            type="text"
            placeholder="eg. 'Primary', 'HSC','Secondary'"
            className="form-control"
            name="classCourse"
            value={classes.classCourse}
            onChange={handleChange}
            required
          />
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

export default AddEditClass;
