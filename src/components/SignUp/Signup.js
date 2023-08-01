import React, { useEffect, useState } from "react";
import "./SignupStyle.css";
import candlepic from "./candle.jpg";
import weblogo from "./logo-icon.svg";
import emaillogo from "./email.svg";
import passkey from "./pass-key.svg";
import fname from "./flname.svg";
import lname from "./flname.svg";
import username from "./user.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initilizeFirebase } from "../../firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const app = initilizeFirebase();
  const db = getDatabase(app);
  const auth = getAuth();
  const history = useHistory();

  const onSignUp = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        set(ref(db, "Customers/" + user.uid), {
          username: username,
          email: email,
        });

        history.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
        // ..
      });
  };

  return (
    <div className="signup-body1">
      <img className="logo1" src={weblogo} alt="CraftHeaven logo" />
      <p className="logo-title1">Craft Haven</p>
      <img className="candles1" src={candlepic} alt="Candlepic" />
      <div className="signup-form1">
        <p className="signup-title1">Sign Up</p>
        <br></br>
        <p className="signup-seller1">
          Do you want to become a seller?{" "}
          <Link to="/sellersignup" style={{ textDecoration: "none" }}>
            Register Here
          </Link>
        </p>
        <br></br>
        <div className="signup-form-inner1">
          <div className="signup-form-group1">
            <img className="fname-logo1" src={fname} alt="Fname-logo" />
            <input
              size="60"
              classname="signup-inputs1"
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
            />
          </div>
          <br></br>
          <div className="signup-form-group1">
            <img className="lname-logo1" src={lname} alt="lname-logo" />
            <input
              size="60"
              className="signup-inputs1"
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
            />
          </div>
          <br></br>
          <div className="signup-form-group1">
            <img
              className="username-logo1"
              src={username}
              alt="username-logo"
            />
            <input
              size="60"
              className="signup-inputs1"
              type="text"
              name="name"
              id="username"
              placeholder="Username"
            />
          </div>
          <br></br>
          <div className="signup-form-group1">
            <img
              className="signup-email-logo1"
              src={emaillogo}
              alt="Email logo"
            />
            <input
              size="60"
              className="signup-inputs1"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <br></br>
          <div className="signup-form-group1">
            <img
              className="signup-passkey-logo1"
              src={passkey}
              alt="Password logo"
            />
            <input
              size="60"
              className="signup-inputs1"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <br></br>
          <p className="signup-seller1">
            Already have an account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </p>
          <br></br>
          <button
            className="signup-btn1"
            value="Register Account"
            onClick={onSignUp}
          >
            Sign Up
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Signup;
