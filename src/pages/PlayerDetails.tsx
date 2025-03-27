import { useEffect, useState } from "react";
import { PlayersD } from "../@types";
import PlayerListD from "../components/PlayerListD";

function PlayerDetails() {
  const [playersD, setPlayersD] = useState<PlayersD>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayersD = async () => {
      try {
        const req = await fetch("/data/details.json");
        const res = await req.json();
        const data = res.players as PlayersD;
        setPlayersD(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayersD();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <PlayerListD players={playersD} />
    </div>
  );
}

export default PlayerDetails;
