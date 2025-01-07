import AgencyModal from "./components/AgencyModal"
import AgencyView from "./components/AgencyView"
import Drawer from "./components/Drawer"
import {useRef} from "react";

function App() {
  const openDialog = useRef();
  return (
    <div className="app-container">
      <Drawer/>
      <AgencyModal openDialog={openDialog} title="Enter Agency Name" placeholder="Name"/>  
      <AgencyView openDialog={openDialog}/>
    </div>
  )
}

export default App