import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";

import Login from "./Pages/Auth/Login";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import TeacherDashboard from "./Pages/Dashboard/TeacherDashboard";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import ClassList from "./Pages/Classes/ClassList";
import AddEditClass from "./Pages/Classes/AddEditClass";
import ClassDetails from "./Pages/Classes/ClassDetails";
import StudentList from "./Pages/Students/StudentList";
import AddEditStudent from "./Pages/Students/AddEditStudent";
import StudentDetails from "./Pages/Students/StudentDetails";
import MarkAttendance from "./Pages/Attendance/MarkAttendance";
import AttendanceRecords from "./Pages/Attendance/AttendanceRecords";
import AttendanceDetails from "./Pages/Attendance/AttendanceDetails";
import AttendanceSummary from "./Pages/Reports/AttendanceSummary";
import ExportReports from "./Pages/Reports/ExportReports";
import UserManagement from "./Settings/UserManagement";
import Profile from "./Settings/Profile";
import AppSettings from "./Settings/AppSettings";
import authService from "./Services/authService";
import Registration from "./Pages/Auth/Registration";

const ShouldShowNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const excludedPaths = [
    "/", // Or "/login" if you prefer
    "/forgot-password",
    "/reset-password",
    "/registration", // Added registration to the excluded paths
    "/login",
  ];

  return !excludedPaths.includes(path); // Show navbar unless path is in excludedPaths
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const showNavbar = ShouldShowNavbar();

  return (
    <>
      {showNavbar && <MyNavbar />} {/* Conditionally render Navbar */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />{" "}
          {/* Registration route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* ... your other routes ... */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/classes/add" element={<AddEditClass />} />
          <Route path="/classes/edit/:id" element={<AddEditClass />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddEditStudent />} />
          <Route path="/students/edit/:id" element={<AddEditStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/attendance" element={<MarkAttendance />} />
          <Route path="/attendance/records" element={<AttendanceRecords />} />
          <Route path="/attendance/:id" element={<AttendanceDetails />} />
          <Route path="/reports/summary" element={<AttendanceSummary />} />
          <Route path="/reports/export" element={<ExportReports />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/settings/user-management"
            element={<UserManagement />}
          />
          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/settings/app" element={<AppSettings />} />
        </Routes>
      </div>
      {showNavbar && <Footer />} {/* Conditionally render Footer */}
    </>
  );
}

export default App;
