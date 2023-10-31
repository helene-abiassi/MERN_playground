import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Experience } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";
import { formatDateAndTime } from "./Functions";

function Comments({ comments }: Experience) {
  const { user } = useContext(AuthContext);

  // const [user, setUser] = useState(true);
  // const [comments, setComments] = useState<CommentsType[] | null>(null);
  const [newComment, setNewComment] = useState({
    author: {
      _id: "",
      email: "",
      username: "",
      user_image: "",
    },
    date: new Date(),
    message: "",
  });
  //!Author not being populated

  console.log("comments :>> ", comments);

  const handleNewComments = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };
  //! COMMENTS NOT UPDATING ON DB + PAGE
  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add if (existingUser)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", newComment.author._id);
    urlencoded.append("email", newComment.author.email);
    urlencoded.append("username", newComment.author.username);
    urlencoded.append("user_image", newComment.author.user_image);
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

  const editComment = () => {
    //TODO -
  };
  const deleteComment = () => {
    //TODO -
    try {
      if (window.confirm("Are you SURE you want to delete your comment?")) {
        console.log("successfull :>> ", "deletedMessage");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("user :>> ", user);

  useEffect(() => {
    setNewComment(newComment);
  }, [comments, user]);

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
      <div>
        {comments?.map((comment, idComment) => {
          return (
            <div key={idComment}>
              <p>{comment.author.username}</p>
              <p>{formatDateAndTime(comment.date)}</p>
              <p>{comment.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
