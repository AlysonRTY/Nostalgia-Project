import { useEffect, useState } from "react";
import { PlayersD } from "../@types";
import PlayerListD from "../components/PlayerListD";
import { LoadingSpinner } from "../components/LoadingSpinner";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <PlayerListD players={playersD} />;
}

export default PlayerDetails;
