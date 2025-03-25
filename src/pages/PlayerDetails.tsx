import { useEffect, useState } from "react";
import { PlayersD } from "../@types";
import PlayerListD from "../components/PlayerListD";

function PlayerDetails() {
  const [playersD, setPlayersD] = useState<PlayersD>([]);

  useEffect(() => {
    const fetchPlayersD = async () => {
      try {
        const req = await fetch("/data/details.json");
        const res = await req.json();
        const data = res.players as PlayersD;
        setPlayersD(data.reverse());
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayersD();
  }, []);

  return (
    <>
      <PlayerListD players={playersD} />
    </>
  );
}

export default PlayerDetails;
