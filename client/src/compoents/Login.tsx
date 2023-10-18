import { ChangeEvent, FormEvent, useState } from "react";
import { UserImage } from "./Signup";

function Login() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    userImage: "",
  });

  //Adapt the logic for image upload
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
      setUser({ ...user, userImage: result.userImage });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = () => {};

  return (
    <>
      {" "}
      <div>
        <form onSubmit={handleFileSubmit}>
          <input onChange={handleFileInput} name="userImage" type="file" />
          <button type="submit">set your profile photo</button>{" "}
          {/* {!Show_default_pic_here- Exists already in user info} */}
          <figcaption>you can also do that in your profile later</figcaption>
        </form>
      </div>{" "}
      <br />
      <div>
        <form onSubmit={handleSubmitLogin}>
          <input onChange={handleLoginInput} name="email" type="text" />
          <label htmlFor="email">Email</label>
          <input onChange={handleLoginInput} name="password" type="password" />
          <label htmlFor="password">password</label>
          <button type="submit">sign up</button>
        </form>
      </div>
    </>
  );
}

export default Login;
