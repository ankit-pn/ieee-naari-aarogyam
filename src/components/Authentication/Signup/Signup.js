/* eslint no-undef: "off"*/
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Patient from "./Patient";
import Hospital from "./Hospital";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
export default function Signup(props) {
  const [alignment, setAlignment] = useState("Patient");
  const handleChange = (
    event,
    newAlignment
  ) => {
    setAlignment(newAlignment);
  };
  const login = () => {
    /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
    props.setMode("login");
  };

  
  if(localStorage.getItem('ID')){
    window.location.replace('/home')
  }


  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-5">
        <div className="wrap">
          {/* <div
                className="img"
                style={{ backgroundImage: "url(images/bg-1.jpg)" }}
              ></div> */}
          <div className="login-wrap p-4 p-md-5">
            <div className="d-flex" style={{ marginBottom: "50px" }}>
              <div className="w-100">
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <Link to="patient">
                    <ToggleButton
                      className="toggleBtn"
                      value="patient"
                      style={{ color: "#01d28e" }}
                    >
                      Patient
                    </ToggleButton>
                  </Link>
                  <Link to="hospital">
                    <ToggleButton
                      className="toggleBtn"
                      value="hospital"
                      style={{ color: "#01d28e" }}
                    >
                      Hospital
                    </ToggleButton>
                  </Link>
                </ToggleButtonGroup>
              </div>
              <div className="w-100">
                <p className="social-media d-flex justify-content-end">
                  <a
                    href="#"
                    className="social-icon d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-facebook"></span>
                  </a>
                  <a
                    href="#"
                    className="social-icon d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-twitter"></span>
                  </a>
                </p>
              </div>
            </div>
            <Routes>
              <Route
                path="/"
                element={<Patient showAlert={props.showAlert} />}
              ></Route>
              <Route
                path="patient"
                element={<Patient showAlert={props.showAlert} />}
              ></Route>
              <Route
                path="hospital"
                element={<Hospital showAlert={props.showAlert} />}
              ></Route>
            </Routes>
            <p className="text-center">
              Already registered?{" "}
              <Link class='link' data-toggle="tab" to="/login/*" onClick={login}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
