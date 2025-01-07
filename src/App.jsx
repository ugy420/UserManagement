import AgencyModal from "./components/AgencyModal"
import AgencyView from "./components/AgencyView"
import Drawer from "./components/Drawer"
import {useRef} from "react";

function App() {
  const openDialog = useRef();
  return (
    <div className="app-container">
      <Drawer/>
      <AgencyModal openDialog={openDialog} placeholder="Name" toEdit/>  
      <AgencyView/>
    </div>
  )
}

export default App