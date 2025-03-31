import Player from "./Players";
import { PlayerListProps } from "../@types";

function PlayerList({
  players,
  start = 0,
  end,
  isTop3 = false,
}: PlayerListProps) {
  return (
    <>
      {players.slice(start, end).map((player) => (
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
