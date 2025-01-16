import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AgencyView from "./components/AgencyView";
import Drawer from "./components/Drawer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Header from "./components/Header";
import UserView from "./components/UserView";
import Permissions from "./components/PermissionView.jsx";
import DashboardView from "./components/DashboardView";
import ProfileSettings from "./components/ProfileSettings";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactPage";
import { useRef } from "react";

function App() {
  const openDialog = useRef();
  const location = useLocation();
  const token = localStorage.getItem("token");
  
  return (
    <div className="app">
      {token && <Drawer />}
      <div className="app-sub">
      {token && <Header />}
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/agency" element={<AgencyView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/roles" element={<UserView />} />
          <Route path="/header" element={<Header />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}