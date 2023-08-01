import React from "react";
import "./LoginFormStyle.css";
import weblogo from "./logo-icon.svg";
import candlepic from "./candle.jpg";
import emaillogo from "./email.svg";
import passkey from "./pass-key.svg";
import { Link, useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { initilizeFirebase } from "../../firebase";
import { getDatabase, push, ref, set, update } from "firebase/database";

const Login = () => {
  const auth = getAuth();
  const app = initilizeFirebase();
  const db = getDatabase(app);
  const history = useHistory();

  const onLogin = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const dt = new Date();
        update(ref(db, "Customers/" + user.uid), {
          last_login: dt,
        });

        history.push("/custDash");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  const sellerlog = () => {
    history.push("/sellerlogin");
  };

  const custlog = () => {
    history.push("/");
  };

  return (
    <div className="login-body">
      <img className="logo" src={weblogo} alt="CraftHeaven logo" />
      <p className="logo-title">Craft Haven</p>
      <img className="candles" src={candlepic} alt="Candlepic" />
      <div>
        <button className="cust-form2" onClick={custlog}>
          Customer
        </button>
        <button className="seller-form2" onClick={sellerlog}>
          Seller
        </button>
      </div>
      <div className="login-form">
        <p className="login-title">Customer Login</p>
        <div className="login-form-inner">
          <div className="login-form-group">
            <img className="email-logo2" src={emaillogo} alt="Email logo" />
            <input
              size="60"
              className="login-inputs"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <br></br>
          <div className="login-form-group">
            <img className="passkey-logo2" src={passkey} alt="Password logo" />
            <input
              size="60"
              className="login-inputs"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <p className="login-seller">
            Do not have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up Here
            </Link>
          </p>
          <br></br>
          <button className="login-btn" value="Sign In" onClick={onLogin}>
            Sign In
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Login;
