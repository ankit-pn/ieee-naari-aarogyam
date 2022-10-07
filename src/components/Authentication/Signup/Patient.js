import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Patient(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [start, setStart] = useState(false);

  const [UID , setUID] = useState('')
  const [Pass , setPass] = useState('')
  const [Email , setEmail] = useState('')
  const [load , setLoad] = useState(false)




  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // let history = useNavigate();
  let regex = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+)\.([a-zA-Z]){2,5}$/;
  let exist = "pjjw30@gmail.com";
  useEffect(() => {
    let email = document.getElementById("email");
    if (email.value == exist)
      props.showAlert("A user with same Email ID already exists", "info");
    else if (regex.test(email.value)) {
      props.showAlert("Successfully registered!", "success");
    } else if (email.value.length) {
      props.showAlert("Invalid Email ID", "danger");
    }
    setStart(false);
  }, [start]);
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(typeof(Email) , typeof(UID),typeof(Pass))

    setLoad(true)
    await axios.post("https://ieee-auth.herokuapp.com/register/user",
      {
        userId : `U-${UID}`,
        email : `${Email}`,
        password : `${Pass}`,
        
      }
    ).then(()=>{
      setLoad(0)
      window.location.replace('/login/patient')
    }).catch((err)=>{
      console.log(err.message)
      setLoad(0)
    })

    setStart(true);
  };


  return (
    <form action="#" className="signin-form">
      <div className="form-group" style={{ marginTop: "40px" }}>
        <input type="text" className="form-control" required value={UID}
            onChange={(e) => setUID(e.target.value)}/>
        <label className="form-control-placeholder" htmlFor="username">
          Username
        </label>
      </div>
      <div className="form-group" style={{ marginTop: "40px" }}>
        <input id="email" type="text" className="form-control" required value={Email}
            onChange={(e) => setEmail(e.target.value)}/>
        <label className="form-control-placeholder" htmlFor="email">
          User Email ID
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
          onClick={handleRegister}
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
