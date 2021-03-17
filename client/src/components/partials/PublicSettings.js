import Spinner from "./Spinner";

export default function PublicSettings(props) {
  return (
    <>
      <form className="edit-public-profile" onSubmit={props.handleSubmit}>
        <div className="form-field">
          <fieldset>
            <label htmlFor="profile_name" className="profile-name">
              Name
            </label>
            <input
              onChange={props.handleChange}
              type="text"
              value={props?.name}
              name="name"
            ></input>
            <p className="error">{props.errors?.name}</p>
          </fieldset>
        </div>
        <div className="form-field">
          <fieldset>
            <label htmlFor="profile_location">Location</label>
            <input
              onChange={props.handleChange}
              type="text"
              value={props?.location}
              name="location"
            ></input>
          </fieldset>
        </div>
        <div className="bio">
          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_bio">Bio</label>
              <textarea
                onChange={props.handleChange}
                name="bio"
                maxLength="1000"
                placeholder="Brief description for your profile."
                rows="8"
                defaultValue={props?.bio}
              ></textarea>
            </fieldset>
          </div>
        </div>

        <div className="skills">
          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_skills">Skills</label>
              <input
                id="profile_skills"
                onChange={props.handleChange}
                type="text"
                value={props.skills}
                name="skills"
                placeholder="Enter ',' comma to add skills"
              ></input>
              <ul className="editor__tag-list">
                {props.stackList.map((stack, i) => (
                  <li key={i} className="editor__tag-default">
                    <span
                      onClick={() => props.handleStackCancel(stack)}
                      className="editor__close-round"
                    >
                      ×
                    </span>
                    <strong>{stack}</strong>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        </div>

        <div className="edit-social-media">
          <h3 className="social-media-heading">Social Profiles</h3>
          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_twitter">Twitter</label>
              <input
                onChange={props.handleChange}
                value={props?.socials?.twitter}
                type="text"
                name="twitter"
              />
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_linkedin">Linkedin</label>
              <input
                onChange={props.handleChange}
                value={props?.socials?.linkedin}
                type="text"
                name="linkedin"
              />
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_github">Github</label>
              <input
                onChange={props.handleChange}
                type="text"
                value={props?.socials?.github}
                name="github"
              ></input>
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <label htmlFor="profile_medium">Medium</label>
              <input
                onChange={props.handleChange}
                type="text"
                value={props?.socials?.medium}
                name="medium"
              ></input>
            </fieldset>
          </div>
        </div>
        <div className="add-btn">
          <button className="standard-btn hero-btn" type="submit">
            {props.isUpdating ? <Spinner /> : "Save Profile"}
          </button>
        </div>
      </form>
    </>
  );
}
