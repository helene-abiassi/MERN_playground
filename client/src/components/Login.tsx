import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../styles/logUp.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { User } from "./Signup";

interface LogInCredentials {
  email: string;
  password: string;
}

interface LogInResponse {
  user: User;
  message: string;
  token: string;
}

function Login() {
  const [loginCredentials, setLoginCredentials] =
    useState<LogInCredentials | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials!.email);
    urlencoded.append("password", loginCredentials!.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/login",
        requestOptions
      );

      if (response.ok) {
        const results: LogInResponse = await response.json();
        console.log("results.username :>> ", results);
        const token = results.token; //Token should be added to every function for users (delete/update)
        if (token) {
          localStorage.setItem("token", token);
        }
      }
    } catch (err) {
      const error = err as Error;
      console.log("error :>> ", error.message);
    }
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");

    return token ? true : false;
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      console.log("user is logged in");
      setIsLoggedIn(true);
    } else {
      console.log("user is NOT logged in");
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

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
        <button className="nakdButton" onClick={logOut}>
          log out
        </button>
      </div>
    </>
  );
}

export default Login;
