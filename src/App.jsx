import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { TokenProvider, TokenContext } from "./components/TokenContext";
import './components/UI/Modal.css';
import UserView from "./components/User/UserView";
import UserRoleMapping from "./components/User/UserRoleMapping";
import Drawer from "./components/Layout/Drawer";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AboutUs from "./components/Layout/AboutUs.jsx";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AgencyView from "./components/Agency/AgencyView";
import Permissions from "./components/Permission/PermissionView";
import DashboardView from "./components/Dashboard/DashboardView.jsx";
import ProfileSettings from "./components/Profile/ProfileSettings";
import ContactPage from "./components/Contact/ContactPage";
import RolesPermissionsView from "./components/Role/RolesPermissionsView";
import Roles from "./components/Role/RoleView";
import Driver from './components/Driver/Vehicle.jsx';
import VehicleReq from "./components/Driver/Vehicle.jsx";

function App() {
  const { token } = useContext(TokenContext);
  return (
    <div className="app">
      {token && <Drawer />}
      <div className="app-sub">
        {token && <Header />}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardView />
                </PrivateRoute>
              }
            />
            <Route
              path="/agency"
              element={
                <PrivateRoute>
                  <AgencyView />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserView />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutUs />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <ContactPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/permissions"
              element={
                <PrivateRoute>
                  <Permissions />
                </PrivateRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <PrivateRoute>
                  <Roles />
                </PrivateRoute>
              }
            />
            <Route
              path="/rolespermissions"
              element={
                <PrivateRoute>
                  <RolesPermissionsView />
                </PrivateRoute>
              }
            />
            <Route
              path="/userroles"
              element={
                <PrivateRoute>
                  <UserRoleMapping />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehiclereq"
              element={
                <PrivateRoute>
                  <VehicleReq/>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        {token && <Footer />}
      </div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <TokenProvider>
        <App />
      </TokenProvider>
    </Router>
  );
}
