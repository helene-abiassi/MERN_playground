import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface CommentsType {
  author: {
    _id: string;
    email: string;
    username: string;
    userImage: string;
  };
  date: Date;
  message: string;
}

function Comments() {
  const [user, setUser] = useState(true);
  const [comments, setComments] = useState<CommentsType[] | null>(null);
  const [newComment, setNewComment] = useState({
    author: {
      _id: "652ada98fef8bfeece28f7cf",
      email: "thair@test.com",
      username: "Thair Mushroom",
      userImage:
        "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697307351/voyageApp/profilephoto_mushroom_calhq4.png",
    },
    date: new Date(),
    message: "",
  });

  const formatDate = (date: Date): string => {
    const formattedDate = new Date(date.getSeconds() * 1000).toLocaleString();
    return formattedDate;
  };

  const handleNewComments = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment({
      ...newComment,
      //   [newComment.message]: e.target.value, //?
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add if (existingUser)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", newComment.author._id);
    urlencoded.append("email", newComment.author.email);
    urlencoded.append("username", newComment.author.username);
    urlencoded.append("user_image", newComment.author.userImage);
    urlencoded.append("message", newComment.message);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/comments/commentsubmission",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const getRealTimeComments = () => {};

  const submitComments = () => {};

  const deleteComment = () => {
    try {
      if (window.confirm("Are you SURE you want to delete your comment?")) {
        console.log("successfull :>> ", "deletedMessage");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setNewComment(newComment);
  }, []);

  return (
    <div>
      <h2>comments:</h2>
      <form onSubmit={handleSubmitComment}>
        <div className="inputContainer">
          <input
            name="message"
            type="text"
            placeholder="Leave a comment..."
            onChange={handleNewComments}
          />
          <button
            style={{ backgroundColor: "white" }}
            className="nakdButton"
            type="submit"
          >
            submit{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M2.08337 21.875L23.9584 12.5L2.08337 3.125V10.4167L17.7084 12.5L2.08337 14.5833V21.875Z"
                fill="#EFCB59"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="commentsBox">
        <p>{newComment.author.username}</p>
        <p>{newComment.message}</p>
      </div>
    </div>
  );
}

export default Comments;
