import React from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { PORTFOLIOS_URL, LOCAL_STORAGE_KEY } from "../../utility/constants";
import Spinner from "../partials/Spinner";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Comments: null,
      fetchRequestError: "",
      postRequestError: "",
      commentBody: "",
      isCreatingComment: false,
    };
  }

  componentDidMount() {
    const id = this.props.id;

    fetch(`${PORTFOLIOS_URL}/${id}/comments`, {
      authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          comments: data.comments,
        });
      })
      .catch((error) => {
        this.setState({
          fetchRequestError: "Not able to fetch the comments",
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isCreatingComment: true,
    });

    const id = this.props.id;
    const { commentBody } = this.state;
    const comment = { body: commentBody };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
      body: JSON.stringify({ comment }),
    };

    fetch(`${PORTFOLIOS_URL}/${id}/comments`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then(({ comment }) => {
        let comments = [...this.state.comments];
        comments.unshift(comment);
        this.setState({
          comments,
          isCreatingComment: false,
          commentBody: "",
        });
      })
      .catch((errors) => {
        this.setState({
          postRequestError: "Not able to create the comment",
          isCreatingComment: false,
        });
      });
  };

  handleChange = ({ target }) => {
    let { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleDeleteComment = (userId) => {
    const id = this.props.id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
    };
    fetch(`${PORTFOLIOS_URL}/${userId}/comments/${userId}`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then(() => {
        let filteredComments = [...this.state.comments].filter(
          (comment) => comment.userId !== userId
        );
        this.setState({
          comments: filteredComments,
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  render() {
    const {
      comments,
      error,
      fetchRequestError,
      commentBody,
      isCreatingComment,
    } = this.state;
    return (
      <>
        <div className="comment-container">
          <h1 className="title">Feedback</h1>
          <div className="user-comment flex">
            {this.props.user ? (
              <>
                <img
                  className="user-avatar"
                  src={
                    this.props.user.image || "http://i.imgur.com/Xzm3mI0.jpg"
                  }
                  alt="user-profile-avatar"
                ></img>
                <form onSubmit={this.handleSubmit}>
                  <textarea
                    name="commentBody"
                    onChange={this.handleChange}
                    value={commentBody}
                    className="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                  ></textarea>
                  <button className="btn btn-sm btn-primary">
                    {isCreatingComment ? <Spinner /> : "Submit"}
                  </button>
                </form>
              </>
            ) : (
              ""
            )}
          </div>
          <Comments
            comments={comments}
            fetchRequestError={fetchRequestError}
            currentUser={this.props.user}
            handleDeleteComment={this.handleDeleteComment}
          />
        </div>
      </>
    );
  }
}

function Comments(props) {
  // console.log(props);
  if (props.fetchRequestError) {
    return <p className="api-fetch-error">{props.fetchRequestError}</p>;
  }

  if (!props.comments) {
    return <Spinner />;
  }

  if (!props.comments?.length) {
    return <h5 className="no-comments">No comments...</h5>;
  }

  return (
    <div className="display-comment">
      <ul className="comment-list">
        {props.comments.map((comment) => (
          <li className="comment-list-item">
            <div className="user-info flex-between">
              <div className="user-details flex">
                <Link
                  to={`/profiles/${comment?.author?.username}`}
                  className="comment-author"
                >
                  <img
                    src={
                      comment?.author?.image || "http://i.imgur.com/Xzm3mI0.jpg"
                    }
                    alt="user-profile-avatar"
                    className="user-avatar"
                  />
                </Link>
                <span className="user-name">{comment?.author?.username}</span>
                <span className="comment-timestamp">
                  {moment(comment.createdAt).format("dddd, MMMM Do YYYY")}
                </span>
              </div>

              {props?.currentUser?.username === comment?.author?.username ? (
                <div className="comment-actions">
                  <span
                    onClick={() => props.handleDeleteComment(comment.id)}
                    className="btn"
                  >
                    🗑 Delete
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="comment">
              <p>{comment?.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(Comment);
