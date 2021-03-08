import Modal from "./Modal"

export default function Card(props) {
  console.log(props.changeModalState)
  return (
    <>
    <div className="portfolio-card" onClick = {props.changeModalState}>
      <img
        src={props.prominentImage}
        alt=""
        className="portfolio-card__image"
      />
      <div className="portfolio-card__text-info">
        <h3>{props.title}</h3>
        <p></p>
        <p>Likes</p>
      </div>
    </div>
    {props.isModalOpen ? <Modal isModalOpen = {props.isModalOpen} changeModalState = {props.changeModalState}/> : ""}
    </>
  );
}
