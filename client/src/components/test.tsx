const handlePostComment = async () => {
    setIsCommentFail(false);
    setIsCommentSuccessfull(false);
    setIsNoText(false);
    setIsNoToken(false);
    const token = getToken();
    if (token) {
      if (textInputValue === null || textInputValue === "") {
        setIsNoText(true);
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("text", newComment.text && newComment.text);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${serverURL}/api/encounters/${_id}/comments`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("result :>> ", result);
          if (result.msg === "comment submitted") {
            setIsCommentSuccessfull(true);
            setUpdatedComments(result.encounter.comments);
            setTextInputValue("");
            // console.log("newComment", newComment);
            // console.log("result", result.encounter.comments);
            // console.log("result.msg", result.msg);
            // console.log("updatedComments :>> ", updatedComments);
          }
        })}