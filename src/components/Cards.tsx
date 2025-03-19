import { CardT } from '../@types';

const Card = (props: CardT) => {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      {props.image && <img src={props.image} alt={props.name} />}
    </div>
  );
};

export default Card;