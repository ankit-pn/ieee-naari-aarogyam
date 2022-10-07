/* eslint no-undef: "off"*/
import React, { useState } from "react";
import "./css/style.css";
import "./js/bootstrap.min.js";
import "./js/jquery.min.js";
import "./js/main.js";
import "./js/popper.js";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./Signup/Signup";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// import axios from "axios";

export default function Authenticate(props) {
  const [alignment, setAlignment] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 text-center">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <Link to="/login/*">
                <ToggleButton value="login" className="toggleBtn">
                  Login
                </ToggleButton>
              </Link>
              <Link to="signup/*">
                <ToggleButton value="signup" className="toggleBtn">
                  Signup
                </ToggleButton>
              </Link>
            </ToggleButtonGroup>
          </div>
        </div>
        <Routes>
          <Route
            path="/*"
            element={
              <Login setMode={setAlignment} showAlert={props.showAlert} />
            }
          ></Route>
          <Route
            path="/login/*"
            element={
              <Login setMode={setAlignment} showAlert={props.showAlert} />
            }
          ></Route>
          <Route
            path="/signup/*"
            element={
              <Signup setMode={setAlignment} showAlert={props.showAlert} />
            }
          ></Route>
        </Routes>
      </div>
    </section>
  );
}
