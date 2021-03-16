import React from "react";
import { withRouter, Link } from "react-router-dom";
import Spinner from "./partials/Spinner";
import PublicSettings from "./partials/PublicSettings";
import AccountSettings from "./partials/AccountSettings";
import { PORTFOLIOS_URL, LOCAL_STORAGE_KEY } from "../utility/constants";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSetting: "Public Profile",
    };
  }

  changeSettings = (activeSetting) => {
    this.setState({ activeSetting: activeSetting });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="profile-setting">
            <div className="user-profile-header flex">
              <div className="avatar">
                <img
                  className="user-avatar"
                  src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                  alt="profile-avatar"
                ></img>
              </div>
              <h1 className="">Vishakha Khatade</h1>
            </div>
            <div className=" wrapper">
              {/* NavFeed */}
              <div className="secondary">
                <ul className="account-settings flex">
                  <li
                    className={
                      this.state.activeSetting === "Public Profile" && "active"
                    }
                    onClick={() => this.changeSettings("Public Profile")}
                  >
                    Public Profile
                  </li>
                  <li
                    className={
                      this.state.activeSetting === "Account Settings" &&
                      "active"
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
                  <PublicSettings />
                ) : (
                  <AccountSettings />
                )}
                <div className="avatar-preview">
                  <img
                    className="user-avatar"
                    src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
                    alt="profile-avatar"
                  ></img>
                  <form className="avatar-form">
                    <fieldset className="upload">
                      <input size="30" type="file" name="user-avatar"></input>
                    </fieldset>
                    <div className="add-btn">
                      <input
                        className="settings-btn btn"
                        type="submit"
                        value="Upload now"
                      ></input>
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
