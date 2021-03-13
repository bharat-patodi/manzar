import Comments from "./partials/Comments";
import Thumbnails from "./partials/Thumbnails";

function Modal(props) {
  return (
    <>
      <div className="overlay">
        <div className="overlay__close-button">
          <button className="close-btn" onClick={props.closeModal}>
            x
          </button>
        </div>
        <div className="overlay__modal">
          <div className="overlay__modal-container">
            <div className="overlay__modal-content-container">
              <div className="modal__user">
                <div className="user-info flex-between">
                  <div className="user-info__container">
                    <img
                      className="user-avatar"
                      src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                      alt="user-profile-avatar"
                    ></img>
                    <div className="user-info__header-details">
                      <h1 className="portfolio-title">
                        Personal portfolio website
                      </h1>
                      <div className="flex">
                        <a className="user-link" href="/profile">
                          Masud Rana
                        </a>
                        <a className="user-follow" href="/profile/follow">
                          Follow
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="user-info__header-actions">
                    <a className="btn" href="https://jonny.me/">
                      Portfolio
                    </a>
                    <a className="btn" href="/profile">
                      🖤 Like
                    </a>
                  </div>
                </div>
              </div>

              <div className="modal__portfolio">
                <iframe
                  title="portfolio"
                  src="https://jonny.me/"
                  frameBorder="0"
                  className="portfolio-preview"
                  height="600%"
                  width="100%"
                />
                {/* <a href="https://jonny.me/"alt="portfolio-link" className="portfolio-link"/> */}
                {/* <a href="https://jonny.me/" className="portfolio-item-link"
                            style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" + ")"}}
                            >

                            </a>     */}
              </div>

              <section className="description-container">
                <p>Hi Dribbblers!</p>
                <p>
                  This is my concept of Personal portfolio website design.
                  <br />I am available for freelance work.
                </p>
                <p>
                  I am available for work :
                  <br />
                  <a href="mailto:abc@gamil.com">mailto:abc@gamil.com</a>
                </p>
              </section>

              <section className="feedback-section">
                <Comments />
              </section>
            </div>

            <section className="user-details-section">
              <div className="user-avatar-container flex">
                <span className="user-avatar-line"></span>
                <a title="Masud Rana" href="/profile">
                  <img
                    className="photo"
                    src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                    alt="user-profile-avatar"
                  ></img>
                </a>
                <span className="user-avatar-line"></span>
              </div>
              <a className="user-link" href="/profile">
                Masud Rana
              </a>
              <div className="user-bio">I try to be a great Designer</div>
            </section>

            <section className="more-by-user-section">
              <Thumbnails />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
