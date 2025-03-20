import { PlayerT } from '../@types';

const Player = (props: PlayerT) => {
  return (
    <div className="player">
      <h2>{props.name}</h2>
      {props.image && <img src={props.image} alt={props.name} />}
    </div>
  );
};

export default Player;