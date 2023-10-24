import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../styles/logUp.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export interface User extends UserImage {
  username: string;
  email: string;
  password: string;
  bio: string;
  member_since: Date;
}

export interface UserImage {
  userImage: string;
}

function Signup() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    userImage:
      "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697397728/voyageApp/userPhoto.png",
    bio: "",
    member_since: new Date(),
  });
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

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || "");
  };

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
        requestOptions
      );
      const result = (await response.json()) as UserImage;

      //Get url from profile picture
      setNewUser({ ...newUser, userImage: result.userImage });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", newUser.username);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("user_image", newUser.userImage);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    setNewUser(newUser);
  }, []);

  // <Navigate to={"/profile"} />
  //! use Navigate hook to redirect user to profile page after signin (with delay)

  return (
    <>
      <div className="LogUpColorBox">
        <div className="photoLine">
          <div>
            <form className="photoForm" onSubmit={handleFileSubmit}>
              <input onChange={handleFileInput} name="userImage" type="file" />
              <button className="formButton uploadButton" type="submit">
                upload
              </button>
            </form>
          </div>

          <img
            style={{
              width: "16%",
              height: "16%",
              marginLeft: "70px",
              borderRadius: "50%",
            }}
            src={newUser.userImage}
            alt=""
          />
        </div>
        <br />
        <form className="infoForm" onSubmit={handleSubmitRegister}>
          <div className="inputContainer">
            <label htmlFor="username">username*</label>
            <input
              placeholder="choose username..."
              onChange={handleRegisterInput}
              name="username"
              type="text"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <br />

          <div className="pswEmailBox">
            <div className="inputContainer">
              <label htmlFor="email">e-mail*</label>
              <input
                placeholder="enter e-mail..."
                onChange={handleRegisterInput}
                name="email"
                type="text"
              />
              <p>* required</p>
            </div>
            <br />
            <div className="inputContainer">
              <label htmlFor="password">password*</label>
              <input
                onChange={handleRegisterInput}
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
            sign up
          </button>
        </form>
        <p>
          Already have an account?
          <Link to={"/login"} style={{ color: "black" }}>
            {" "}
            log in.
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
