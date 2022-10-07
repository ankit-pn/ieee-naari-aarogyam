import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Hospital(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [start, setStart] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [HID , setHID] = useState('')
  const [Pass , setPass] = useState('')
  const [Name , setName] = useState('')
  const [load , setLoad] = useState(false)


  let regex = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+)\.([a-zA-Z]){2,5}$/;
  let exist = "pjjw30@gmail.com";
  useEffect(() => {
    let email = document.getElementById("email");
    if (email.value == exist)
      props.showAlert("A hospital with same Email ID already exists", "info");
    else if (regex.test(email.value)) {
      props.showAlert("Successfully registered!", "success");
    } else if (email.value.length) {
      props.showAlert("Invalid Email ID", "danger");
    }
    setStart(false);
  }, [start]);
  const btnClick = async(e) => {
    e.preventDefault();
    setLoad(true)
    await axios.post("https://ieee-auth.herokuapp.com/register/hospital",
      {
        hospitalId : `H-${HID}`,
        hospitalName : `${Name}`,
        password : `${Pass}`,
        
      }
    ).then(()=>{
      setLoad(false)
      window.location.replace('/login/hospital')
    }).catch((err)=>{
      console.log(err.message)
      setLoad(false)
    })



    setStart(true);
  };
  return (
    <form action="#" className="signin-form">
      <div className="form-group" style={{ marginTop: "40px" }}>
        <input type="text" className="form-control" required value={Name}
            onChange={(e) => setName(e.target.value)} />
        <label className="form-control-placeholder" htmlFor="username">
          Hospital Name
        </label>
      </div>
      <div className="form-group" style={{ marginTop: "40px" }}>
        <input id="email" type="text" className="form-control" required value={HID}
            onChange={(e) => setHID(e.target.value)} />
        <label className="form-control-placeholder" htmlFor="email">
          Hospital Id
        </label>
      </div>
      <div className="form-group" style={{ marginTop: "40px" }}>
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
          Sign Up
        </button>
      </div>
    </form>
  );
}
