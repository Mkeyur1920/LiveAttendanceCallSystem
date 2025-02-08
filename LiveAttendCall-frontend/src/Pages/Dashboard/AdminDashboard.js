import Chart from "chart.js/auto";

import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import attendanceService from "../../Services/attendanceService";

const AdminDashboard = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const { authToken } = useContext(AuthContext);

  useEffect(
    () => {
      const fetchAttendanceData = async () => {
        try {
          const date = selectedDate.toISOString().split("T")[0];
          const data = await attendanceService.getAttendanceData(date);
          // Set attendance data

          const transformedData = data.map((item) => ({
            className: item.className,
            section: item.section,
            coursename: item.classCourse,
            present: item.present,
            absent: item.absent,
          }));

          setAttendanceData(attendanceData);
          // Prepare Pie Chart Data
          const pieLabels = transformedData.map(
            (item) => item.className + " " + item.section
          );
          // const pieSection = data.map((item) => item.section);
          // const pieCourseName = data.map((item) => item.courseName);
          const piePresent = transformedData.map((item) => item.present);
          const pieAbsent = transformedData.map((item) => item.absent);

          setPieChartData({
            labels: pieLabels,
            datasets: [
              {
                label: "Present",
                data: piePresent,
                backgroundColor: [
                  "#36A2EB",
                  "#4BC0C0",
                  "#FF6384",
                  "#FFCE56",
                  "#9966FF",
                ],
                hoverBackgroundColor: [
                  "#36A2EB",
                  "#4BC0C0",
                  "#FF6384",
                  "#FFCE56",
                  "#9966FF",
                ],
              },

              {
                label: "Absent",
                data: pieAbsent,
                backgroundColor: [
                  "#FF6384",
                  "#FF9F40",
                  "#FFCD56",
                  "#4BC0C0",
                  "#36A2EB",
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#FF9F40",
                  "#FFCD56",
                  "#4BC0C0",
                  "#36A2EB",
                ],
              },
            ],
          });

          setBarChartData({
            labels: pieLabels,
            datasets: [
              {
                label: "Present",
                data: piePresent,
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                borderWidth: 1,
              },
              {
                label: "Absent",
                data: pieAbsent,
                backgroundColor: "#FF6384",
                borderColor: "#FF6384",
                borderWidth: 1,
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };

      fetchAttendanceData();
    },
    [selectedDate]
    // [authToken]
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      {/* Date Picker */}
      <div className="mb-3">
        <label htmlFor="datePicker" className="form-label">
          Select Date:
        </label>
        select date between 2024/03/01 to 2024/03/05
        {/* <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          id="datePicker"
        /> */}
      </div>
      <div className="row">
        <div className="col-md-8 mb-4">
          <h4>Attendance by Class</h4>
          {barChartData?.labels?.length > 0 ? (
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Attendance Trends by Class" },
                },
              }}
            />
          ) : (
            <p>Loading Bar Chart...</p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Overall Attendance</h4>
          {pieChartData?.labels?.length > 0 ? (
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  title: { display: true, text: "Overall Attendance" },
                },
              }}
            />
          ) : (
            <p>Loading Pie Chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
