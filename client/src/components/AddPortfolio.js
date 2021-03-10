import { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "./partials/Spinner";
import { portfolioURL, localStorageKey } from "./utility/utility";

class AddPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: "",
      images: "",
      tagList: [],
      errors: {
        description: "",
        body: "",
        url: "",
        tagList: "",
      },
      tagInput: "",
      isCreating: false,
      requestError: "",
    };
    this.images = createRef();
  }

  addFile = (file) => {
    console.dir(this.images.current);
    // this.setState({
    //   files: file.map((file) =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file),
    //     })
    //   ),
    // });
    // var reader = new FileReader();
    // var url = reader.readAsDataURL(this.images.current.files[0]);
    this.setState({
      images: URL.createObjectURL(this.images.current.files[0]),
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isCreating: true });
    const { url, description, body, tagList } = this.state;
    const portfolio = { url, description, body, tagList };
    const errors = this.state.errors;

    if (!errors.url && !errors.description && !errors.body && !errors.tagList) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem(localStorageKey),
        },
        body: JSON.stringify({ portfolio }),
      };
      fetch(portfolioURL, requestOptions)
        .then(async (res) => {
          if (!res.ok) {
            const { errors } = await res.json();
            return await Promise.reject(errors);
          }
          return res.json();
        })
        .then(({ portfolio }) => {
          this.setState({ isCreating: false });
          this.props.history.push(`/portfolios/${portfolio.slug}`);
        })
        .catch(() => {
          this.setState({
            requestError: "Not able to create the portfolio",
            isCreating: false,
          });
        });
    }
  };
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    let tags = [];

    if (name === "tagInput" && value.includes(",")) {
      tags = value
        .trim()
        .split(",")
        .map((tag) => tag.trim())
        .filter((val) => val !== "");
      value = "";
    }

    validatePortfolioInfo(value, name, errors);

    this.setState(({ tagList }) => ({
      [name]: value,
      tagList: tagList.concat(tags),
      errors: errors,
    }));
  };
  handleTagCancel = (tag) => {
    let { tagList } = this.state;
    tagList = tagList.filter((val) => val !== tag);
    this.setState({ tagList });
  };
  // componentWillUnmount() {
  //   this.state.files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }
  render() {
    const {
      url,
      description,
      images,
      tagList,
      errors,
      tagInput,
      isCreating,
      requestError,
    } = this.state;

    return (
      <section className="editor">
        <div className="container">
          <h1 className="editor__heading">Add Portfolio</h1>
          <form className="editor__form" onSubmit={this.handleSubmit}>
            <p className="editor__server-error">{requestError}</p>
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
              {errors.url ? (
                <span className="editor__error-msg">{errors.url}</span>
              ) : (
                ""
              )}
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
                required
              ></textarea>
              {errors.description ? (
                <span className="editor__error-msg">{errors.description}</span>
              ) : (
                ""
              )}
            </fieldset>

            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="tags">
                Tags
              </label>
              <input
                id="tags"
                onChange={this.handleChange}
                name="tagInput"
                value={tagInput}
                className="editor__form-control"
                type="text"
                placeholder="Enter comma ' , ' after typing a tag"
              />
              {errors.tagList ? (
                <span className="editor__error-msg">{errors.tagList}</span>
              ) : (
                ""
              )}
              <ul className="editor__tag-list">
                {tagList.map((tag, i) => (
                  <li key={i} className="editor__tag-default">
                    <span
                      onClick={() => this.handleTagCancel(tag)}
                      className="editor__close-round"
                    >
                      x
                    </span>
                    <strong>{tag}</strong>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="editor__form-group">
              <label className="editor__form-label" htmlFor="image">
                Choose a image or gif
              </label>
              <input
                id="image"
                ref={this.images}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  this.addFile(event);
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              <img alt="subject" src={images} />
              <span>x</span>
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

export function validatePortfolioInfo(value, name, errors) {
  switch (name) {
    case "url":
      errors.url = !value.length ? "url is required" : "";
      break;
    case "description":
      errors.description = !value.length
        ? "Description is required"
        : value.length < 10
        ? "Description must have atleast 10 character"
        : "";
      break;
    case "body":
      errors.body = !value.length
        ? "Body is required"
        : value.length < 20
        ? "Body must have atleast 20 character"
        : "";
      break;
    default:
      break;
  }
}

export default withRouter(AddPortfolio);
