import Modal from "./Modal/Modal";

export default function Card(props) {
  // console.log(props);
  return (
    <>
      <div className="portfolio-card" onClick={props.openModal}>
        <img
          src={props.prominentImage}
          alt=""
          className="portfolio-card__image"
        />
        <div className="portfolio-card__text-info">
          <h4>{props.author}</h4>
          <p>Likes</p>
          <p>Views</p>
        </div>
      </div>
      {props.isModalOpen ? (
        <Modal
          isModalOpen={props.isModalOpen}
          closeModal={props.closeModal}
          author={props.author}
        />
      ) : (
        ""
      )}
    </>
  );
}
