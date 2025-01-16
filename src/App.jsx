import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AgencyModal from "./components/AgencyModal";
import AgencyView from "./components/AgencyView";
import Drawer from "./components/Drawer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Header from "./components/Header";
import UserView from "./components/UserView";
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
          <Route path="/UserView" element={<UserView />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/DashboardView" element={<DashboardView />} />
          <Route path="/Profile" element={<ProfileSettings />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Add the Profile route */}
        </Routes>
      </div>
      <AgencyModal openDialog={openDialog} placeholder="Name" toEdit />
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