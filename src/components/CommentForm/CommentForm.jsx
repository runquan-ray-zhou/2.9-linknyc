import "./CommentForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommentForm({ terminalId }) {
  const navigate = useNavigate();

  // mockapi holding list of comments for each location
  const commentsURL =
    "https://6637c889288fedf69381538c.mockapi.io/api/v1/notes";

  const [comment, setComment] = useState({
    commenter: "",
    comment: "",
  });

  const [newComment, setNewComment] = useState({
    cb_link_id: `${terminalId}`,
    comments: [
      {
        commenter: "",
        comment: "",
      },
    ],
  });

  const [displayComment, setDisplayComment] = useState({});

  useEffect(() => {
    fetch(commentsURL)
      .then((response) => response.json())
      .then((response) => {
        const filtered = response.filter(
          (ele) => ele.cb_link_id === terminalId
        );
        setDisplayComment(filtered);
      });
  }, []);

  function handleTextChange(e) {
    setNewComment({
      ...newComment,
      comments: [{ ...comment, [e.target.id]: e.target.value }],
    });
    setComment({ ...comment, [e.target.id]: e.target.value });
  }

  async function createNewComment(newComment) {
    const options = {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`${commentsURL}`, options);
      await response.json();
      navigate(0);
    } catch (error) {
      return console.error(error);
    }
  }

  function addComments(e) {
    e.preventDefault();
    createNewComment(newComment);
  }

  async function deleteComment(id) {
    const options = { method: "DELETE" };
    await fetch(`${commentsURL}/${id}`, options);
    return navigate(0);
  }

  return (
    <div className="commentForm">
      <p>
        <span>{displayComment.length}</span> Comments
      </p>
      <form onSubmit={addComments}>
        <div className="commenter">
          <label>
            Commenter
            <br />
            <br />
            <input
              onChange={handleTextChange}
              type="text"
              id="commenter"
              value={newComment.comments[0].commenter}
            />
          </label>
        </div>
        <br />
        <div className="comment">
          <label>
            Comment
            <br />
            <br />
            <input
              onChange={handleTextChange}
              type="text"
              id="comment"
              value={newComment.comments[0].comment}
            />
          </label>
        </div>
        <br />
        <input className="submit-button" type="submit" value="Add Comment" />
      </form>
      <ul>
        {Array.isArray(displayComment) &&
          displayComment.map((ele, i) => {
            const hasComment =
              Array.isArray(ele.comments) && ele.comments.length > 0;
            return (
              <li key={i}>
                <p>
                  {hasComment ? ele.comments[0].commenter : "Anonymous"}
                  <br />
                  <br />
                  <span>
                    "
                    {hasComment
                      ? ele.comments[0].comment
                      : "No comment provided"}
                    "
                  </span>
                </p>
                <button onClick={() => deleteComment(ele.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
