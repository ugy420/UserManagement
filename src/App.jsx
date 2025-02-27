import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { TokenProvider, TokenContext } from "./components/TokenContext";
import "./components/UI/Modal.css";
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
import VehicleReq from "./components/Vehicle/VehicleRequestIndividual.jsx";
import Vehicle from "./components/Vehicle/Vehicle.jsx";
import Driver from "./components/Driver/Driver.jsx";
import VehicleRequestManage from './components/Vehicle/VehicleRequestManage.jsx';
import Receipt from "./components/receipt/receipt";

function App() {
  const { token } = useContext(TokenContext);
  return (
    <div className="app">
      <Header/>
      <div className="app-sub">
      {token && <Drawer />}
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
              path="/user"
              element={
                <PrivateRoute>
                  <UserView />
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
              path="/permissions"
              element={
                <PrivateRoute>
                  <Permissions />
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
              path="/about"
              element={
                  <AboutUs />
              }
            />
            <Route
              path="/contact"
              element={
                  <ContactPage />
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
              path="/roles-permissions"
              element={
                <PrivateRoute>
                  <RolesPermissionsView />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-roles"
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
                  <VehicleReq />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehicle"
              element={
                <PrivateRoute>
                  <Vehicle />
                </PrivateRoute>
              }
            />
            <Route
              path="/driver"
              element={
                <PrivateRoute>
                  <Driver />
                </PrivateRoute>
              }
            />
            <Route
              path="/receipt"
              element={
                <PrivateRoute>
                  <Receipt />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehiclereqmanage"
              element={
                <PrivateRoute>
                  <VehicleRequestManage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
      {token && <Footer />}
    </div>
  );
}

export default App;
