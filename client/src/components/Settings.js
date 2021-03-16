import { Component, createRef } from "react";
import { withRouter, Link } from "react-router-dom";
import Spinner from "./partials/Spinner";
import { validateUserInfo } from "./Register";
import PublicSettings from "./partials/PublicSettings";
import AccountSettings from "./partials/AccountSettings";
import { CURRENT_USER_URL, LOCAL_STORAGE_KEY } from "../utility/constants";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSetting: "Public Profile",
      stackList: [],
      name: "",
      username: "",
      email: "",
      location: "",
      bio: "",
      socials: null,
      avatar: null,
      avatarPreview: null,
      errors: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      validationError: "",
      requestError: "",
      isUpdating: false,
      isUpdatingAvatar: false,
      avatarUpdateMsg: "",
    };
    this.avatar = createRef();
  }
  componentDidMount() {
    this.setState({
      ...this.props.user,
    });
  }
  handleAvatarSubmit = (event) => {
    event.preventDefault();
    this.setState({ isUpdatingAvatar: true });
    const { avatar } = this.state;
    const formData = new FormData();
    formData.append("avatar", avatar);

    const requestOptions = {
      method: "PUT",
      headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
      body: formData,
    };

    fetch(CURRENT_USER_URL, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.errors);
        if (data.errors) {
          this.setState({
            validationError: "No able to update avatar",
          });
        } else {
          this.props.updateUser(data.user);
          // this.props.history.push(`/profiles/${data.user.username}`);
        }
        this.setState({
          isUpdatingAvatar: false,
          avatarUpdateMsg: "Avatar is Updated",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          requestError: "Not able to update avatar",
          isUpdatingAvatar: false,
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isUpdating: true });
    const {
      username,
      email,
      location,
      name,
      bio,
      socials,
      avatarPreview,
    } = this.state;
    const user = { username, email, location, name, bio, socials };
    const errors = this.state.errors;

    if (!errors.name && !errors.username && !errors.email && !errors.password) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
        },
        body: JSON.stringify({ user }),
      };

      fetch(CURRENT_USER_URL, requestOptions)
        .then((res) => {
          console.log(res);
          if (res.status !== 422 && !res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.errors) {
            const error = data.errors.body[0];

            this.setState({
              validationError: error.includes("email")
                ? "Email is already exist"
                : "Username is already exist",
            });
          } else {
            this.props.updateUser(data.user);
            this.props.history.push(`/profiles/${data.user.username}`);
          }
          this.setState({ isUpdating: false });
        })
        .catch((error) => {
          this.setState({
            requestError: "Not able to Update",
            isUpdating: false,
          });
        });
    }
  };

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    let socials = {};

    validateUserInfo(value, name, errors);

    switch (name) {
      case "twitter":
      case "github":
      case "medium":
      case "linkedin":
        socials[name] = value;
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      socials,
      errors: errors,
    });
  };

  addFile = () => {
    const file = this.avatar.current.files[0];
    this.setState({
      avatar: this.avatar.current.files[0],
      avatarPreview: URL.createObjectURL(file),
    });
  };

  changeSettings = (activeSetting) => {
    this.setState({ activeSetting: activeSetting });
  };

  componentWillUnmount() {
    const fileUrl = this.state.avatarPreview;
    this.setState({
      avatarUpdateMsg: "",
    });
    URL.revokeObjectURL(fileUrl);
  }

  render() {
    const {
      username,
      email,
      location,
      name,
      bio,
      avatarPreview,
      avatar,
      socials,
      isUpdating,
      validationError,
      requestError,
      isUpdatingAvatar,
      avatarUpdateMsg,
      errors,
    } = this.state;

    return (
      <>
        <div className="container">
          <div className="profile-setting">
            <div className="user-profile-header flex">
              <div className="avatar">
                <img
                  className="user-avatar"
                  src={avatar ?? "http://i.imgur.com/Xzm3mI0.jpg"}
                  alt="profile-avatar"
                ></img>
              </div>
              <h1>{name}</h1>
            </div>
            <p className="error server">{validationError}</p>
            <p className="error server">{requestError}</p>
            <div className="wrapper">
              {/* NavFeed */}
              <div className="secondary">
                <ul className="account-settings flex">
                  <li
                    className={
                      this.state.activeSetting === "Public Profile"
                        ? "active"
                        : ""
                    }
                    onClick={() => this.changeSettings("Public Profile")}
                  >
                    Public Profile
                  </li>
                  <li
                    className={
                      this.state.activeSetting === "Account Settings"
                        ? "active"
                        : ""
                    }
                    onClick={() => this.changeSettings("Account Settings")}
                  >
                    Account Settings
                  </li>
                </ul>
              </div>
              {/* Main */}
              <div className="main flex">
                {this.state.activeSetting === "Public Profile" ? (
                  <PublicSettings
                    location={location}
                    errors={errors}
                    bio={bio}
                    socials={socials}
                    name={name}
                    isUpdating={isUpdating}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  />
                ) : (
                  <AccountSettings
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    username={username}
                    errors={errors}
                    email={email}
                    isUpdating={isUpdating}
                    deleteUser={this.props.deleteUser}
                  />
                )}
                <div className="avatar-preview">
                  <form
                    className="avatar-form"
                    onSubmit={this.handleAvatarSubmit}
                  >
                    <img
                      className="user-avatar-img"
                      src={
                        avatarPreview ||
                        avatar ||
                        "http://i.imgur.com/Xzm3mI0.jpg"
                      }
                      alt="profile-avatar"
                    ></img>
                    <fieldset className="upload">
                      <label htmlFor="avatar" className="camera-btn">
                        📷
                      </label>
                      <input
                        onChange={this.addFile}
                        id="avatar"
                        ref={this.avatar}
                        type="file"
                        accept="image/*"
                        name="avatar"
                      ></input>
                    </fieldset>
                    <p className="avatar-updated">{avatarUpdateMsg}</p>
                    <div className="upload-btn">
                      <button className="standard-btn" type="submit">
                        {isUpdatingAvatar ? <Spinner /> : "Upload now"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Settings);
