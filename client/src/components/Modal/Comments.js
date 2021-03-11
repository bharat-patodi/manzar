export default function Comments() {
  return (
    <>
      <div className="comment-container">
        <h1 className="title">Feedback</h1>
        <div className="user-comment flex">
          <img
            className="user-avatar"
            src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
            alt="user-profile-picture"
          ></img>
          <form>
            <input placeholder="Write a comment"></input>
          </form>
        </div>
        <div className="display-comment">
          <ul className="comment-list">
            <li className="comment-list-item">
              <div className="user-info flex-between">
                <div className="user-details flex">
                  <img
                    className="user-avatar"
                    src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                    alt="user-profile-picture"
                  ></img>
                  <span className="user-name">Petar A</span>
                  <span className="comment-timestamp">Just now</span>
                  <span className="comment-count">#10</span>
                </div>

                <div className="comment-actions">
                  <a className="modal-button btn">Edit</a>
                  <a className="modal-button btn">Delete</a>
                </div>
              </div>
              <div className="comment">
                <p>Nice Work! Keep it up!</p>
              </div>
            </li>

            <li className="comment-list-item">
              <div className="user-info flex-between">
                <div className="user-details flex">
                  <img
                    className="user-avatar"
                    src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                    alt="user-profile-picture"
                  ></img>
                  <span className="user-name">Petar A</span>
                  <span className="comment-timestamp">Just now</span>
                  <span className="comment-count">#10</span>
                </div>

                <div className="comment-actions">
                  <a className="modal-button btn">Edit</a>
                  <a className="modal-button btn">Delete</a>
                </div>
              </div>
              <div className="comment">
                <p>Clean layout, Good combination of colors, Good Job!</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
