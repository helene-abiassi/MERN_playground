import { ChangeEvent, FormEvent, useState } from "react";

interface User extends UserImage {
  username: string;
  email: string;
  password: string;
  bio: string;
  member_since: Date;
}

interface UserImage {
  userImage?: string;
}

function SignUp() {
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
  return (
    <>
      <div>
        <form onSubmit={handleFileSubmit}>
          <input type="file" name="file" onChange={handleFileInput} />
          <button type="submit">upload</button>
        </form>
      </div>
      {newUser.userImage && (
        <div>
          <img src={newUser.userImage} alt="user-avatar-photo" />
        </div>
      )}
    </>
  );
}

export default SignUp;
