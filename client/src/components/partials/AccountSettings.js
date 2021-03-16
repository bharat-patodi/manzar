import Spinner from "./Spinner";

function AccountSettings(props) {
  return (
    <>
      <form className="edit-public-profile" onSubmit={props.handleSubmit}>
        <div className="form-field">
          <fieldset>
            <label htmlFor="profile_username" className="profile-username">
              Username
            </label>
            <input
              onChange={props.handleChange}
              id="profile_username"
              type="text"
              value={props.username}
              name="username"
            ></input>
            <p className="error">{props.errors?.username}</p>
          </fieldset>
        </div>
        <div className="form-field">
          <fieldset>
            <label for="profile_email">Email</label>
            <input
              onChange={props.handleChange}
              id="profile_email"
              type="email"
              value={props.email}
              name="email"
            ></input>
            <p className="error">{props.errors?.password}</p>
          </fieldset>
        </div>

        <div className="account-section">
          <h3 className="account-section-heading">Account Changes</h3>
          <div className="wrapper flex-between">
            <div className="flex-column">
              <p className="standard-btn sign-out" onClick={props.deleteUser}>
                Sign Out
              </p>
            </div>
            <div className="">
              <button className="standard-btn" type="submit">
                {props.isUpdating ? <Spinner /> : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AccountSettings;
