import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    userImage: "",
    bio: "",
    member_since: new Date(),
  });

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
    urlencoded.append("userImage", newUser.userImage);
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
      <div>
        <form onSubmit={handleSubmitRegister}>
          <input onChange={handleRegisterInput} name="username" type="text" />
          <label htmlFor="username">Username </label>
          <input onChange={handleRegisterInput} name="email" type="text" />
          <label htmlFor="email">Email</label>
          <input
            onChange={handleRegisterInput}
            name="password"
            type="password"
          />
          <label htmlFor="password">password</label>
          <button type="submit">sign up</button>
        </form>
      </div>
      {/* <div>
        <form onSubmit={handleFileSubmit}>
          <input name="userImage" type="file" onChange={handleFileInput} />
          <button type="submit">upload</button>
        </form>
      </div> */}
      {/* {newUser.userImage && (
        <div>
          <img src={newUser.userImage} alt="user-avatar-photo" />
        </div>
      )} */}
    </>
  );
}

export default Signup;
