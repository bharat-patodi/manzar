export default function PublicSettings(props) {
  return (
    <>
      <form className="edit-public-profile">
        <div className="form-field">
          <fieldset>
            <label for="profile_name" className="profile-name">
              Name
            </label>
            <input
              type="text"
              value="Vishakha Khatade"
              name="profile_name"
            ></input>
          </fieldset>
        </div>
        <div className="form-field">
          <fieldset>
            <label for="profile_location">Location</label>
            <input type="text" value="India" name="profile_location"></input>
          </fieldset>
        </div>
        <div className="bio">
          <div className="form-field">
            <fieldset>
              <label for="profile_bio">Bio</label>
              <textarea
                name="profile_bio"
                maxLength="1000"
                placeholder="Brief description for your profile."
                rows="8"
              ></textarea>
            </fieldset>
          </div>
        </div>

        <div className="edit-social-media">
          <h3 className="social-media-heading">Social Profiles</h3>
          <div className="form-field">
            <fieldset>
              <label for="profile_twitter">Twitter</label>
              <input type="text" name="profile_twitter"></input>
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label for="profile_linkedin">Linkedin</label>
              <input type="text" name="profile_linkedin"></input>
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label for="profile_github">Github</label>
              <input type="text" name="profile_github"></input>
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label for="profile_medium">Medium</label>
              <input type="text" name="profile_medium"></input>
            </fieldset>
          </div>
        </div>
        <div className="add-btn">
          <input
            className="settings-btn btn"
            type="submit"
            value="Save Profile"
          ></input>
        </div>
      </form>
    </>
  );
}
