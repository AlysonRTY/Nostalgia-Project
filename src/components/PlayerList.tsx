import Player from "./Players";
import { PlayerListProps } from "../@types";

function PlayerList({ players, isTop3 = false }: PlayerListProps) {
  return (
    <>
      {players.map((player) => (
        <Player
          key={player.id}
          {...player}
          rank={parseInt(player.id, 10)}
          isTop3={isTop3}
        />
      ))}
    </>
  );
}

export default PlayerList;
