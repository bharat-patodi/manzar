import { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "./partials/Spinner";
import { PORTFOLIOS_URL, LOCAL_STORAGE_KEY } from "../utility/constants";

class AddPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: "",
      image: "",
      imageFile: null,
      type: "",
      tagList: [],
      tagInput: "",
      stackInput: "",
      isCreating: false,
      requestError: "",
    };
    this.image = createRef();
  }
  addFile = () => {
    const file = this.image.current.files[0];
    this.setState({
      imageFile: this.image.current.files[0],
      image: URL.createObjectURL(file),
    });
  };
  removeFile = () => {
    const fileUrl = this.state.image;
    this.setState(
      {
        image: URL.revokeObjectURL(fileUrl),
      },
      () => {
        this.image.current.value = "";
      }
    );
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isCreating: true });
    const { url, description, tagList, imageFile, type } = this.state;

    const formData = new FormData();
    formData.append("url", url);
    formData.append("description", description);
    formData.append("tagList", JSON.stringify(tagList));
    formData.append("type", type);
    formData.append("image", imageFile);

    const requestOptions = {
      method: "POST",
      headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
      body: formData,
    };

    fetch(PORTFOLIOS_URL, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then(({ portfolio }) => {
        this.setState({ isCreating: false });
        this.props.history.push(`/portfolios/${portfolio.id}`);
      })
      .catch(() => {
        this.setState({
          requestError: "Not able to create the portfolio",
          isCreating: false,
        });
      });
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let tags = [];

    console.dir(event);

    if (name === "tagInput" && value.includes(",")) {
      tags = value
        .trim()
        .split(",")
        .map((tag) => tag.trim())
        .filter((val) => val !== "");
      value = "";
    }

    this.setState(({ tagList }) => {
      const tagListSet = new Set(tagList.concat(tags));
      return {
        [name]: value,
        tagList: Array.from(tagListSet),
      };
    });
  };
  handleTagCancel = (tag) => {
    let { tagList } = this.state;
    tagList = tagList.filter((val) => val !== tag);
    this.setState({ tagList });
  };

  componentWillUnmount() {
    const fileUrl = this.state.image;
    URL.revokeObjectURL(fileUrl);
  }
  render() {
    const {
      url,
      description,
      image,
      type,
      tagList,
      stackList,
      tagInput,
      stackInput,
      isCreating,
      requestError,
    } = this.state;

    return (
      <section className="editor">
        <div className="container">
          <h1 className="editor__heading">Add Portfolio</h1>
          <p className="editor__server-error">{requestError}</p>
          <form className="editor__form" onSubmit={this.handleSubmit}>
            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="url">
                Portfolio url
              </label>
              <input
                id="url"
                onChange={this.handleChange}
                name="url"
                value={url}
                className="editor__form-control"
                type="text"
                placeholder="Portfolio url"
                required
              />
            </fieldset>
            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="description">
                Write something
              </label>
              <textarea
                id="description"
                onChange={this.handleChange}
                name="description"
                value={description}
                className="editor__form-control"
                rows="4"
                placeholder="Write something"
              ></textarea>
            </fieldset>

            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="tags">
                Tags
              </label>
              <input
                id="tags"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                name="tagInput"
                value={tagInput}
                className="editor__form-control"
                type="text"
                placeholder="Press comma ' , ' after typing a tag"
              />
              <ul className="editor__tag-list">
                {tagList.map((tag, i) => (
                  <li key={i} className="editor__tag-default">
                    <span
                      onClick={() => this.handleTagCancel(tag)}
                      className="editor__close-round"
                    >
                      ×
                    </span>
                    <strong>{tag}</strong>
                  </li>
                ))}
              </ul>
            </fieldset>
            {/* <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="stacks">
                Stacks
              </label>
              <input
                id="stacks"
                onChange={this.handleChange}
                name="stackInput"
                value={stackInput}
                className="editor__form-control"
                type="text"
                placeholder="Press comma ' , ' after typing a stack"
              />
              <ul className="editor__tag-list">
                {stackList.map((stack, i) => (
                  <li key={i} className="editor__tag-default">
                    <span
                      onClick={() => this.handleStackCancel(stack)}
                      className="editor__close-round"
                    >
                      ×
                    </span>
                    <strong>{stack}</strong>
                  </li>
                ))}
              </ul>
            </fieldset> */}
            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="type">
                Portfolio type
              </label>
              <select
                id="type"
                onChange={this.handleChange}
                name="type"
                value={type}
                className="editor__form-control"
              >
                <option value="">Select your portfolio type</option>
                <option value="animation">Animation</option>
                <option value="branding">Branding</option>
                <option value="illustration">Illustration</option>
                <option value="mobile">Mobile</option>
                <option value="print">Print</option>
                <option value="productDesign">Product Design</option>
                <option value="typography">Typography</option>
                <option value="webDesign">Web Design</option>
              </select>
            </fieldset>
            <hr />
            <fieldset className="editor__form-group">
              {image ? (
                <div className="image-preview-div">
                  <img className="image-preview" alt="subject" src={image} />

                  <span
                    className="image-preview-cancel"
                    onClick={this.removeFile}
                  >
                    cancel
                  </span>
                </div>
              ) : (
                <>
                  <label
                    className="editor__form-label file-label"
                    htmlFor="image"
                  >
                    🗂️ Choose an image or GIF
                  </label>
                  <input
                    id="image"
                    ref={this.image}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      this.addFile(event);
                    }}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                  />
                </>
              )}
            </fieldset>

            <button className="btn-large">
              {isCreating ? <Spinner /> : "Add Portfolio"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(AddPortfolio);
