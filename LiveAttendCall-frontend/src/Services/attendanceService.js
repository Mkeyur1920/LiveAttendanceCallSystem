import axios from "axios";

const API_URL = "/api/attendance";
const API_BASE_URL = "http://localhost:8080";

const attendanceService = {
  getAllAttendanceRecords: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getAttendanceById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  getStudentsByClassId: async (classId) => {
    const response = await axios.get(`${API_URL}/students/${classId}`);
    return response.data;
  },
  markAttendance: async (attendanceData) => {
    const response = await axios.post(API_URL, attendanceData);
    return response.data;
  },

  getAttendanceData: async (date) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/admin/admin-dashboard?date=${date}`
    );

    return response.data;
  },

  processAttendance: async (fromData) => {
    const response = await axios.post(
      `${API_BASE_URL}` + `${API_URL}/process-attendance`,
      fromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response;
  },

  // getAttendanceData: async (token) => {
  //   const response = await axios.get(
  //     `${API_BASE_URL}/api/attendance/dashboard-data`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   return response.data;
  // },
};

export default attendanceService;
