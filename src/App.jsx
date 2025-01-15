import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AgencyModal from "./components/AgencyModal";
import AgencyView from "./components/AgencyView";
import Drawer from "./components/Drawer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Header from "./components/Header";
import UserView from "./components/UserView";
import DashboardView from "./components/DashboardView";
import { useRef } from "react";

function App() {
  const openDialog = useRef();
  const location = useLocation();

  // Define paths where Drawer is not displayed
  const hideDrawerRoutes = ["/login", "/signup"];

  return (
    <div>
      {/* Conditionally render Drawer */}
      {!hideDrawerRoutes.includes(location.pathname) && <Drawer />}
      
      <div className={hideDrawerRoutes.includes(location.pathname) ? "main-content-full" : "main-content"}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/agency" element={<AgencyView />} />
          <Route path="/UserView" element={<UserView />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/DashboardView" element={<DashboardView />} />
        </Routes>
      </div>
      <AgencyModal openDialog={openDialog} placeholder="Name" toEdit />
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