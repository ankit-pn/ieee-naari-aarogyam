import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Patient(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [start, setStart] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let navigate = useNavigate();
  const [checked, setChecked] = useState(true);



  const [UID ,setUID] = useState('')
  const [Pass ,setPass] = useState('')
  const [load , setLoad] = useState(false)


  useEffect(() => {
    let userid = document.getElementById("userid").value,
      password = document.getElementById("password-field").value;
    let currid = "paragjjw",
      curr_password = "HwxvWt7SHpZwhqg";
    if (userid == currid && password == curr_password) navigate("/home/*"); 
    setStart(false);
  }, [start]);
  const btnClick = async(e) => {
    e.preventDefault();
    console.log(UID , Pass)
    setLoad(true)
    await axios.post("https://ieee-auth.herokuapp.com/login/user",
      {
        userId : `U-${UID}`,
        password : `${Pass}`,
        
      }
    ).then((res)=>{

      console.log(res)
    
      localStorage.setItem('ID' , JSON.stringify(res.data.userId))
      localStorage.setItem('Token' , JSON.stringify(res.data.token))
      setLoad(false)
      window.location.replace('/home')  
    }).catch((err)=>{
      console.log(err.message)
      props.showAlert("Id and Password doesn't match", "danger");
      setLoad(false)
    })


    setStart(true);
  };
  return (
    <form action="#" className="signin-form">
      <div className="form-group mt-3">
        <input id="userid" type="text" className="form-control" required value={UID}
            onChange={(e) => setUID(e.target.value)}/>
        <label className="form-control-placeholder" htmlFor="userid">
          UserID
        </label>
      </div>
      <div className="form-group">
        <input
          id="password-field"
          type={passwordShown ? "text" : "password"}
          className="form-control"
          style={{ marginTop: "33px" }}
          required
          value={Pass}
            onChange={(e) => setPass(e.target.value)}
        />
        <label className="form-control-placeholder" htmlFor="password">
          Password
        </label>
        <span
          onClick={togglePasswordVisiblity}
          className="fa fa-fw fa-eye field-icon toggle-password"
        ></span>
      </div>
      <div className="form-group">
        <button
          onClick={btnClick}
          type="submit"
          className="form-control btn btn-primary rounded submit px-3"
          disabled = {load}
        >
          Sign In 
        </button>
      </div>
      <div className="form-group d-md-flex">
        <div className="w-50 text-left">
          <label className="checkbox-wrap checkbox-primary mb-0">
            Remember Me
            <input
              type="checkbox"
              defaultChecked={checked}
              onChange={() => setChecked(!checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="w-50 text-md-right">
          <a href="#">Forgot Password</a>
        </div>
      </div>
    </form>
  );
}
