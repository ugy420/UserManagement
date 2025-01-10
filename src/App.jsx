import AgencyModal from "./components/AgencyModal"
import AgencyView from "./components/AgencyView"
import UserModal from "./components/UserModal"
import UserView from "./components/UserView"
import Drawer from "./components/Drawer"
import {useRef} from "react";
import Dashboard from "./components/DashboardView"

function App() {
  const openDialog = useRef();
  return (
    <div className="app-container">
      <Drawer/>
      <Dashboard/>
    </div>
  )
}

export default App