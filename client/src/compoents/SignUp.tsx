import { ChangeEvent, FormEvent, useState } from "react";

interface User extends UserImage {
  username: string;
  email: string;
  password: string;
  bio: string;
  member_since: Date;
}

interface UserImage {
  userImage: string;
}

function Signup() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    userImage: "",
    bio: "",
    member_since: new Date(),
  });

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
      <div>
        <form onSubmit={handleFileSubmit}>
          <input name="userImage" type="file" onChange={handleFileInput} />
          <button type="submit">upload</button>
        </form>
      </div>
      {/* {newUser.userImage && (
        <div>
          <img src={newUser.userImage} alt="user-avatar-photo" />
        </div>
      )} */}
    </>
  );
}

export default Signup;
