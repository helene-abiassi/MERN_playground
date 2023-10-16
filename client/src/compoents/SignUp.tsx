import { ChangeEvent, FormEvent, useState } from "react";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");

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
      const results = await response.json();
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
    </>
  );
}

export default SignUp;
