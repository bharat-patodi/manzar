import Modal from "./Modal";
import { Link } from "react-router-dom";

export default function Card(props) {
  // console.log(props);
  return (
    <>
      <div className="portfolio-card">
        <Link to={`portfolios/${props.id}`} onClick={props.openModal}>
          <img
            src={props.image || props.prominentImage}
            alt=""
            className="portfolio-card__image"
          />
        </Link>

        <div className="portfolio-card__text-info">
          <h4>{props.author}</h4>
          <p>Likes</p>
          <p>Views</p>
        </div>
      </div>
      {props.isModalOpen ? (
        <Modal isModalOpen={props.isModalOpen} closeModal={props.closeModal} />
      ) : (
        ""
      )}
    </>
  );
}
