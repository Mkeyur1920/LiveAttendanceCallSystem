import axios from "axios";

const Backend_API_URL = "http://localhost:8080";

const API_URL = Backend_API_URL + "/api/students";

const studentService = {
  getAllStudents: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getStudentById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  createStudent: async (newStudent) => {
    const response = await axios.post(API_URL, newStudent);
    return response.data;
  },
  updateStudent: async (id, updatedStudent) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
    return response.data;
  },
  deleteStudent: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default studentService;
