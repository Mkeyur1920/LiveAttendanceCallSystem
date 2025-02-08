import axios from "axios";

const Backend_API_URL = "http://localhost:8080/api/class";

const API_URL = Backend_API_URL + "/api/classes"; // Assuming the endpoint is "/api/classes"

const classService = {
  getAllClasses: async () => {
    try {
      const response = await axios.get(`${Backend_API_URL}/getAll`, {});
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      return [];
    }
  },
  getClassById: async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}` + "/getClassById/" + `${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching class with ID ${id}:`, error);
      return null;
    }
  },
  createClass: async (newClass) => {
    try {
      const response = await axios.post(
        `${Backend_API_URL}/api/class/createClass`,
        newClass
      );
      return response.data;
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },
  updateClass: async (id, updatedClass) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedClass);
      return response.data;
    } catch (error) {
      console.error(`Error updating class with ID ${id}:`, error);
      throw error;
    }
  },
  getSectionsByClassName: async (className) => {
    try {
      const response = await axios.get(
        `${API_URL}` + "/getSectionsByClassName/" + `${className}` + "/sections"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteClass: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting class with ID ${id}:`, error);
      throw error;
    }
  },
};

export default classService;
