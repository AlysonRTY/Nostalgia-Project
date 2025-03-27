import { useParams, Link, Navigate } from "react-router";
import { PlayerListDProps } from "../@types";
import { useEffect } from "react";

function PlayerListD({ players }: PlayerListDProps) {
  const { playerName } = useParams();
  const player = players.find((p) => p.name === playerName);

  if (!player) {
    return <Navigate to="/not-found" replace />;
  }

  const isGoalkeeper = player.position === "GK";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [playerName]);

  // Helper function to render a stat bar
  function renderStat(label: string, value: number | undefined) {
    const safeValue = value ?? 0;
    const widthPercentage = `${safeValue}%`;

    return (
      <div
        className="bg-white p-2 md:p-4 rounded shadow-xs md:shadow-sm"
        key={label}
      >
        <div className="flex justify-between items-center mb-1 md:mb-2">
          <span className="text-xs md:text-sm font-medium text-gray-600">
            {label}
          </span>
          <span className="text-base md:text-lg font-bold text-gray-900">
            {safeValue}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 md:h-2.5 rounded-full"
            style={{ width: widthPercentage }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-24 pb-4 md:pb-8 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/best-players"
          className="mb-4 md:mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base"
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

        {/* Player Card */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Player Image */}
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 flex justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={player.image}
                alt={player.name}
                className="w-full max-w-xs object-contain rounded-lg h-64 md:h-96"
              />
            </div>

            {/* Player Details */}
            <div className="w-full md:w-2/3 lg:w-3/4 p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 md:mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
                  {player.name}
                </h1>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-md md:shadow-lg self-start md:self-auto">
                  {player.position}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 mb-6 md:mb-8">
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Weak Foot
                  </span>
                  <span className="text-base md:text-lg font-semibold">
                    {player.weak_foot}★
                  </span>
                </div>
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Skill Moves
                  </span>
                  <span className="text-base md:text-lg font-semibold">
                    {player.skill_moves}★
                  </span>
                </div>
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Preferred Foot
                  </span>
                  <span className="text-base md:text-lg font-semibold capitalize">
                    {player.preferred_foot}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Height
                  </span>
                  <span className="text-base md:text-lg font-semibold">
                    {player.height}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Weight
                  </span>
                  <span className="text-base md:text-lg font-semibold">
                    {player.weight}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 md:p-4 rounded">
                  <span className="text-xs md:text-sm text-gray-500 block">
                    Work Rates
                  </span>
                  <span className="text-base md:text-lg font-semibold">
                    {player.work_rate}
                  </span>
                </div>
              </div>

              {/* Stats Section */}
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                Player Stats
              </h2>
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {isGoalkeeper ? (
                    <>
                      {renderStat("Diving", player.stats.diving)}
                      {renderStat("Handling", player.stats.handling)}
                      {renderStat("Kicking", player.stats.kicking)}
                      {renderStat("Reflexes", player.stats.reflexes)}
                      {renderStat("Speed", player.stats.speed)}
                      {renderStat("Positioning", player.stats.positioning)}
                    </>
                  ) : (
                    <>
                      {renderStat("Pace", player.stats.pace)}
                      {renderStat("Shooting", player.stats.shooting)}
                      {renderStat("Passing", player.stats.passing)}
                      {renderStat("Dribbling", player.stats.dribbling)}
                      {renderStat("Defending", player.stats.defending)}
                      {renderStat("Physical", player.stats.physical)}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerListD;
