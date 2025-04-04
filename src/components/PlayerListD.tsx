import { useParams, Link, Navigate, useLocation } from "react-router";
import { PlayerListDProps } from "../@types";
import { useEffect } from "react";
import { CommentsSection } from "../context/CommentsSection";
import { ScrollController } from "./ScrollController";

function PlayerListD({ players }: PlayerListDProps) {
  const { playerName } = useParams();
  const location = useLocation();
  const player = players.find((p) => p.name === playerName);

  useEffect(() => {
    if (!location.state?.scrollToPlayerId) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [playerName, location.state?.scrollToPlayerId]);

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
    <div className="bg-white p-2 md:p-4 rounded shadow-xs md:shadow-sm">
      <div className="flex justify-between items-center mb-1 md:mb-2">
        <span className="text-xs md:text-sm font-medium text-gray-600">
          {label}
        </span>
        <span className="text-base md:text-lg font-bold text-gray-900">
          {value}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
        <div
          className="bg-gradient-to-r from-red-500 to-green-600 h-2 md:h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="pt-16 md:pt-24 pb-4 md:pb-8 px-4 md:px-8 bg-gray-100 min-h-screen">
      <ScrollController />
      <div className="max-w-6xl mx-auto">
        <Link
          to={location.state?.from || "/best-players"}
          state={{
            scrollToPlayerId: location.state?.scrollToPlayerId,
            preserveScroll: true,
            from: location.pathname,
          }}
          className="mb-4 md:mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base"
        >
          {/* back button content */}
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

        <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 flex justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={player.image}
                alt={player.name}
                className="w-full max-w-xs object-contain rounded-lg h-64 md:h-96"
              />
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 md:mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
                  {player.name}
                </h1>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-md md:shadow-lg self-start md:self-auto">
                  {player.position}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 mb-6 md:mb-8">
                {infoItems.map((item, i) => (
                  <div key={i} className="bg-gray-50 p-2 md:p-4 rounded">
                    <span className="text-xs md:text-sm text-gray-500 block">
                      {item.label}
                    </span>
                    <span className="text-base md:text-lg font-semibold capitalize">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                Player Stats
              </h2>
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {statBars.map((stat) => (
                    <StatBar
                      key={stat}
                      label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                      value={player.stats[stat as keyof typeof player.stats]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8">
        <CommentsSection playerId={player.name} />
      </div>
    </div>
  );
}

export default PlayerListD;
