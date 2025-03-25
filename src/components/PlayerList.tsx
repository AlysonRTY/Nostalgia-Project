import Player from "./Players";
import { PlayersT } from "../@types";

interface PlayerListProps {
  players: PlayersT;
  start: number;
  end: number;
  isTop3?: boolean;
}

function PlayerList({ players, start, end, isTop3 = false }: PlayerListProps) {
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
