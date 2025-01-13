import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgencyModal from "./components/AgencyModal";
import AgencyView from "./components/AgencyView";
import Drawer from "./components/Drawer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import User from "./components/UserView.jsx";
import { useRef } from "react";


function App() {
  const openDialog = useRef();
  return (
    <Router>
      {/* <div className="app-container">
        <Drawer />
        <div className="main-content"></div>  */}
        <Routes>
          <Route path="/agency" element={<AgencyView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/users" element={<User />} />
        </Routes>
        <AgencyModal openDialog={openDialog} placeholder="Name" toEdit />
      {/* </div> */}
    </Router>
  );
}

export default App;