export default function Card(props) {
  return (
    <div className="portfolio-card">
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
  );
}
