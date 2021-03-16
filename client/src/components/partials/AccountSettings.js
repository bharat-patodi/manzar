import React from "react";
import { NavLink, Link } from "react-router-dom";

class AccountSettings extends React.Component {
  render() {
    return (
      <>
        <form className="edit-public-profile">
          <div className="form-field">
            <fieldset>
              <label for="profile_username" className="profile-username">
                Username
              </label>
              <input type="text" value="Vishakha" name="profile_name"></input>
            </fieldset>
          </div>
          <div className="form-field">
            <fieldset>
              <label for="profile_email">Email</label>
              <input type="email" value="India" name="profile_email"></input>
            </fieldset>
          </div>

          <div className="account-section">
            <h3 className="account-section-heading">Account Changes</h3>
            <div className="wrapper flex-between">
              <div className="flex-column">
                <a className="settings-btn btn sign-out">Sign Out</a>
              </div>
              <div className="add-btn">
                <input
                  className="settings-btn btn"
                  type="submit"
                  value="Save Profile"
                ></input>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default AccountSettings;
