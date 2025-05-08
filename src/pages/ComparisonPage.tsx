import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { PlayerD } from "../@types";
import { LoadingSpinner } from "../components/LoadingSpinner";

function ComparisonPage() {
  const [players, setPlayers] = useState<PlayerD[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerD[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerD[]>([]);
  const [positionFilter, setPositionFilter] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const req = await fetch("/data/details.json");
        const res = await req.json();
        const data = res.players as PlayerD[];
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    if (location.state?.compareWith) {
      const playerToCompare = players.find(
        (p) => p.name === location.state.compareWith
      );
      if (playerToCompare) {
        setSelectedPlayers([playerToCompare]);
        setPositionFilter(playerToCompare.position === "GK" ? "GK" : "Field");
      }
    }
  }, [players, location.state]);

  useEffect(() => {
    if (positionFilter === "GK") {
      setFilteredPlayers(players.filter((p) => p.position === "GK"));
    } else if (positionFilter === "Field") {
      setFilteredPlayers(players.filter((p) => p.position !== "GK"));
    } else {
      setFilteredPlayers([]);
    }
  }, [positionFilter, players]);

  const togglePlayerSelection = (player: PlayerD) => {
    if (selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Player Comparison
          </h1>
          <p className="text-gray-300">
            Compare up to 2 players. Field players can only be compared with
            other field players, and goalkeepers with other goalkeepers.
          </p>
        </div>

        {selectedPlayers.length > 0 && (
          <div className="mb-8 bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Selected Players ({selectedPlayers.length}/2)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPlayers.map((player) => (
                <div
                  key={player.id}
                  className="border border-gray-700 rounded-lg p-4 flex items-center bg-gray-700/50"
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-white">{player.name}</h3>
                    <p className="text-sm text-gray-400">{player.position}</p>
                  </div>
                  <button
                    onClick={() => togglePlayerSelection(player)}
                    className="ml-auto text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {selectedPlayers.length === 2 && (
              <div className="mt-6">
                <Link
                  to={`/compare/${selectedPlayers[0].name}-vs-${selectedPlayers[1].name}`}
                  state={{
                    player1: selectedPlayers[0],
                    player2: selectedPlayers[1],
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Compare Now
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0 text-white">
              Available Players
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setPositionFilter("Field")}
                className={`px-3 py-1 rounded-md ${
                  positionFilter === "Field"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Field Players
              </button>
              <button
                onClick={() => setPositionFilter("GK")}
                className={`px-3 py-1 rounded-md ${
                  positionFilter === "GK"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Goalkeepers
              </button>
            </div>
          </div>

          {filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  onClick={() => togglePlayerSelection(player)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlayers.some((p) => p.id === player.id)
                      ? "border-blue-500 bg-blue-900/20"
                      : "border-gray-700 hover:border-gray-600 bg-gray-700/30"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-12 h-12 object-contain mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-white">{player.name}</h3>
                      <p className="text-sm text-gray-400">{player.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {positionFilter
                ? `No ${
                    positionFilter === "GK" ? "goalkeepers" : "field players"
                  } found`
                : "Please select a player type to compare"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComparisonPage;
