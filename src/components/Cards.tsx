import { CardT } from '../@types';

const Card = (props: CardT) => {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Power: {props.power}</p>
      {props.imageUrl && <img src={props.imageUrl} alt={props.name} />}
    </div>
  );
};

export default Card;