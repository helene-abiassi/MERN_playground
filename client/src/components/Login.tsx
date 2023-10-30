import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import "../styles/logUp.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { User } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";

export interface LogInCredentials {
  email: string;
  password: string;
}

export interface LogInResponse {
  user: User;
  message: string;
  token: string;
}

function Login() {
  const { loginCredentials, setLoginCredentials, logIn } =
    useContext(AuthContext);


  const [passwordType, setPasswordType] = useState("password");
  const [showOrHide, setShowOrHide] = useState("show");
  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowOrHide("hide");
      return;
    }
    setPasswordType("password");
    setShowOrHide("show");
  };

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    setLoginCredentials({
      ...(loginCredentials as LogInCredentials),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn();


  return (
    <>
      <div className="LogUpColorBox">
        <img
          style={{
            width: "20%",
            height: "20%",
            marginLeft: "400px",
          }}
          src="https://res.cloudinary.com/dfm1r4ikr/image/upload/v1698010076/voyageApp/logo-variations-01_atukuy.png"
          alt=""
        />
        <form className="infoForm" onSubmit={handleSubmitLogin}>
          <div className="pswEmailBoxL">
            <div className="inputContainer">
              <label htmlFor="email">e-mail*</label>
              <input
                placeholder="enter e-mail..."
                onChange={handleLoginInput}
                name="email"
                type="text"
              />
              <p>* required</p>
            </div>
            <br />
            <div className="inputContainer">
              <label htmlFor="password">password*</label>
              <input
                onChange={handleLoginInput}
                name="password"
                placeholder="enter password..."
                type={passwordType}
              />
              <button
                onClick={changePasswordType}
                className="hide-password formButton"
                style={{ cursor: "pointer" }}
              >
                {showOrHide}
              </button>
            </div>
          </div>
          <br />
          <button className="nakdButton" type="submit">
            log in
          </button>
        </form>
        <p>
          Don't have an account yet?
          <Link to={"/signup"} style={{ color: "black" }}>
            {" "}
            sign up.
          </Link>
        </p>

      </div>
    </>
  );
}

export default Login;
