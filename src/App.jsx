import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { TokenProvider, TokenContext } from "./components/TokenContext";
import UserView from "./components/UserView";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AgencyView from "./components/AgencyView";
import Permissions from "./components/PermissionView";
import DashboardView from "./components/DashboardView";
import ProfileSettings from "./components/ProfileSettings";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactPage";
import RolesPermissionsView from "./components/RolesPermissionsView";
import Roles from "./components/RoleView";
import PrivateRoute from "./components/PrivateRoute";
import UserRoleMapping from "./components/UserRoleMapping";

function App() {
  const { token } = useContext(TokenContext);

  return (
    <div className="app">
      {token && <Drawer />}
      <div className="app-sub">
        {token && <Header />}
        <div>
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
                  <UserRoleMapping/>
                </PrivateRoute>}
            />
          </Routes>
          
        </div>
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
