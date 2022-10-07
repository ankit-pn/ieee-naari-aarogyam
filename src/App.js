import "./App.css";
import React,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authenticate from "./components/Authentication/Authenticate.js";
import Home from "./components/Home";
import Alert from "./components/Alert";
import HDocuments from "./components/custom/Hospital/HDocuments";
import Udocs from "./components/custom/User/Udocs";
import E1 from './components/custom/Exercises/E1'
import Navbar2 from "./components/Navbar2";

import Wrapper from "./components/custom/Wrapper";


// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [alert, setalert] = useState(null);
  function showAlert(message, type) {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <Router>
      <Alert alert={alert}></Alert>
      <Routes>
        <Route path="/*" element={<Authenticate showAlert={showAlert} />}></Route>
        <Route path="/home/*" element={<Wrapper><Home /></Wrapper>}></Route>
        <Route path='/hdocs' element={<Wrapper><HDocuments /></Wrapper>} />
        <Route path='/udocs' element={<Wrapper><Udocs /></Wrapper>} />
        <Route path='/exercise/1' element={<><Navbar2/> <E1/></> } />
      </Routes>
    </Router>
  );
}

export default App;
