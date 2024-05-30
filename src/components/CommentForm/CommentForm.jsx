import './CommentForm.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommentForm({ terminalId }) {
  const navigate = useNavigate();

  let BASE_URL = 'https://6637c889288fedf69381538c.mockapi.io/api/v1/notes';

  const [comment, setComment] = useState({
    commenter: '',
    comment: '',
  });

  const [newComment, setNewComment] = useState({
    objectid: `${terminalId}`,
    comments: [
      {
        commenter: '',
        comment: '',
      },
    ],
  });

  const [displayComment, setDisplayComment] = useState({});

  useEffect(() => {
    fetch('https://6637c889288fedf69381538c.mockapi.io/api/v1/notes')
      .then((response) => response.json())
      .then((response) => {
        const filtered = response.filter((ele) => ele.objectid === terminalId);
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

  function createNewComment(newComment) {
    const options = {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}`, options)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        navigate(0);
      })
      .catch((error) => console.error(error));
  }

  function addComments(e) {
    e.preventDefault();
    createNewComment(newComment);
  }

  function deleteComment(id) {
    const options = { method: 'DELETE' };
    return fetch(
      `https://6637c889288fedf69381538c.mockapi.io/api/v1/notes/${id}`,
      options
    ).then(() => navigate(0));
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
        {displayComment[0] &&
          displayComment.map((ele, i) => (
            <li key={i}>
              <p>
                @{ele.comments[0].commenter}{' '}
                <span>{ele.comments[0].comment}</span>
              </p>
              <button onClick={() => deleteComment(ele.id)}>
              Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
