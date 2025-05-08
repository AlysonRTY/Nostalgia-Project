import {
  useParams,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";
import { PlayerListDProps } from "../@types";
import { useEffect } from "react";
import { CommentsSection } from "../context/CommentsSection";

function PlayerListD({ players }: PlayerListDProps) {
  const { playerName } = useParams();
  const location = useLocation();
  const player = players.find((p) => p.name === playerName);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.preserveScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }
  }, [playerName, location.state?.preserveScroll]);

  if (!player) return <Navigate to="/not-found" replace />;

  const isGoalkeeper = player.position === "GK";
  const statBars = isGoalkeeper
    ? ["diving", "handling", "kicking", "reflexes", "speed", "positioning"]
    : ["pace", "shooting", "passing", "dribbling", "defending", "physical"];

  const infoItems = [
    { label: "Weak Foot", value: `${player.weak_foot}★` },
    { label: "Skill Moves", value: `${player.skill_moves}★` },
    { label: "Preferred Foot", value: player.preferred_foot },
    { label: "Height", value: player.height },
    { label: "Weight", value: player.weight },
    { label: "Work Rates", value: player.work_rate },
  ];

  const StatBar = ({ label, value = 0 }: { label: string; value?: number }) => (
    <div className="bg-gray-700 p-4 rounded-xl shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 capitalize">
          {label}
        </span>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const compareFromDetails = (playerName: string) => {
    navigate("/compare", { state: { compareWith: playerName } });
  };

  return (
    <div className="pt-16 pb-8 px-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            to={location.state?.from || "/best-players"}
            state={{
              scrollToPlayerId: location.state?.scrollToPlayerId,
              preserveScroll: true,
              from: location.pathname,
            }}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Players List
          </Link>
          <button
            onClick={() => compareFromDetails(player.name)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Compare Player
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col items-center bg-gradient-to-b from-gray-800 to-gray-900 border-b md:border-b-0 md:border-r border-gray-700">
              <div className="relative mb-4">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full max-w-xs object-contain rounded-lg h-64 md:h-80"
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">{player.club}</h2>
                <p className="text-gray-400">{player.nation}</p>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {player.name}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {infoItems.map((item, i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-xl">
                    <span className="text-xs text-gray-400 block mb-1">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-white capitalize">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
                Player Attributes
              </h2>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {statBars.map((stat) => (
                    <StatBar
                      key={stat}
                      label={stat}
                      value={player.stats[stat as keyof typeof player.stats]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-8 border border-gray-700 p-6">
          <CommentsSection playerId={player.name} />
        </div>
      </div>
    </div>
  );
}

export default PlayerListD;
