import { useParams } from "react-router";
import { PlayersD } from "../@types";

interface PlayerListDProps {
  players: PlayersD;
}

function PlayerListD({ players }: PlayerListDProps) {
  const { playerName } = useParams();

  const player = players.find((p) => p.name === playerName);

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div>
      <h1>Details for {player.name}</h1>
      <img src={player.image} alt={player.name} />
      <p>Weak Foot: {player.weak_foot}</p>
      <p>Skill Moves: {player.stats.pace}</p>
    </div>
  );
}

export default PlayerListD;
