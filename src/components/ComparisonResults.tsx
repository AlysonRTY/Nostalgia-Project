import { Link, useLocation } from "react-router";
import { PlayerD } from "../@types";

function ComparisonResults() {
  const location = useLocation();
  const { player1, player2 } = location.state as {
    player1: PlayerD;
    player2: PlayerD;
  };

  if (!player1 || !player2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Comparison data not found
          </h2>
          <Link
            to="/compare"
            className="text-blue-400 hover:text-blue-300 hover:underline flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Go back to comparison tool
          </Link>
        </div>
      </div>
    );
  }

  const isGoalkeeper = player1.position === "GK";
  const statCategories = isGoalkeeper
    ? ["diving", "handling", "kicking", "reflexes", "speed", "positioning"]
    : ["pace", "shooting", "passing", "dribbling", "defending", "physical"];

  const infoItems = [
    { label: "Weak Foot", key: "weak_foot" },
    { label: "Skill Moves", key: "skill_moves" },
    { label: "Height", key: "height" },
  ];

  const getBetterPlayer = (stat: string) => {
    const p1Stat = player1.stats[stat as keyof typeof player1.stats] || 0;
    const p2Stat = player2.stats[stat as keyof typeof player2.stats] || 0;

    if (p1Stat > p2Stat) return 1;
    if (p2Stat > p1Stat) return 2;
    return 0;
  };

  const calculateDifference = (p1Value: number, p2Value: number) => {
    return Math.abs(p1Value - p2Value);
  };

  const calculateCategoryWins = () => {
    let player1Wins = 0;
    let player2Wins = 0;
    let ties = 0;

    statCategories.forEach((stat) => {
      const p1Value = player1.stats[stat as keyof typeof player1.stats] || 0;
      const p2Value = player2.stats[stat as keyof typeof player2.stats] || 0;

      if (p1Value > p2Value) player1Wins++;
      else if (p2Value > p1Value) player2Wins++;
      else ties++;
    });

    infoItems.forEach((item) => {
      const p1Value = player1[item.key as keyof PlayerD];
      const p2Value = player2[item.key as keyof PlayerD];

      if (typeof p1Value === "number" && typeof p2Value === "number") {
        if (p1Value > p2Value) player1Wins++;
        else if (p2Value > p1Value) player2Wins++;
        else ties++;
      }
    });

    return { player1Wins, player2Wins, ties };
  };

  const { player1Wins, player2Wins, ties } = calculateCategoryWins();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Player Comparison</h1>
          <Link
            to="/compare"
            className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            New Comparison
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-700">
            <div className="p-6 text-center bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={player1.image}
                    alt={player1.name}
                    className="h-40 w-40 object-contain"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {player1.rating}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-white">
                {player1.name}
              </h2>

              <span className="inline-block bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {isGoalkeeper ? "Goalkeeper" : "Field Player"}
              </span>
            </div>

            <div className="p-6 text-center bg-gradient-to-b from-gray-800 to-gray-900 border-l border-gray-700">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={player2.image}
                    alt={player2.name}
                    className="h-40 w-40 object-contain"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {player2.rating}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-white">
                {player2.name}
              </h2>
              <span className="inline-block bg-red-900 text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                {isGoalkeeper ? "Goalkeeper" : "Field Player"}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
              Attributes Comparison
            </h3>
            <div className="space-y-6">
              {statCategories.map((stat) => {
                const p1Value =
                  player1.stats[stat as keyof typeof player1.stats] || 0;
                const p2Value =
                  player2.stats[stat as keyof typeof player2.stats] || 0;
                const betterPlayer = getBetterPlayer(stat);
                const diff = calculateDifference(p1Value, p2Value);

                return (
                  <div
                    key={stat}
                    className="bg-gray-700 rounded-xl p-4 shadow-inner"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-300 capitalize">
                        {stat}
                      </span>
                      {diff > 0 && (
                        <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">
                          +{diff} difference
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-lg font-bold ${
                          betterPlayer === 1
                            ? "text-green-400"
                            : betterPlayer === 2
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {p1Value}
                      </span>
                      <div className="relative flex-1 mx-4">
                        <div className="h-3 w-full bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-l-full ${
                              betterPlayer === 1
                                ? "bg-green-500"
                                : betterPlayer === 2
                                ? "bg-gray-400"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${p1Value}%` }}
                          />
                        </div>
                        <div className="h-3 w-full bg-gray-600 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-l-full ${
                              betterPlayer === 2
                                ? "bg-green-500"
                                : betterPlayer === 1
                                ? "bg-gray-400"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${p2Value}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className={`text-lg font-bold ${
                          betterPlayer === 2
                            ? "text-green-400"
                            : betterPlayer === 1
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {p2Value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infoItems.map((item) => {
                const p1Value = player1[item.key as keyof PlayerD];
                const p2Value = player2[item.key as keyof PlayerD];

                const renderValue = (value: any) => {
                  if (typeof value === "number") {
                    return `${value}★`;
                  }
                  if (typeof value === "string") {
                    return value;
                  }
                  return "";
                };

                const betterPlayer =
                  typeof p1Value === "number" && typeof p2Value === "number"
                    ? p1Value > p2Value
                      ? 1
                      : p2Value > p1Value
                      ? 2
                      : 0
                    : 0;

                return (
                  <div
                    key={item.key}
                    className="bg-gray-700 rounded-xl p-4 shadow-inner"
                  >
                    <h4 className="font-medium text-gray-300 mb-3">
                      {item.label}
                    </h4>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full mr-2 ${
                            betterPlayer === 1
                              ? "bg-green-500"
                              : betterPlayer === 2
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span
                          className={`font-medium ${
                            betterPlayer === 1
                              ? "text-green-400"
                              : betterPlayer === 2
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        >
                          {renderValue(p1Value)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`font-medium ${
                            betterPlayer === 2
                              ? "text-green-400"
                              : betterPlayer === 1
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        >
                          {renderValue(p2Value)}
                        </span>
                        <div
                          className={`h-3 w-3 rounded-full ml-2 ${
                            betterPlayer === 2
                              ? "bg-green-500"
                              : betterPlayer === 1
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-900">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">
              Comparison Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-900/50 rounded-lg p-4">
                <div className="text-blue-300 text-sm font-medium mb-1">
                  {player1.name}
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {player1Wins}
                </div>
                <div className="text-xs text-blue-200">Categories Won</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-300 text-sm font-medium mb-1">
                  Tied
                </div>
                <div className="text-2xl font-bold text-white">{ties}</div>
                <div className="text-xs text-gray-400">Categories</div>
              </div>
              <div className="bg-red-900/50 rounded-lg p-4">
                <div className="text-red-300 text-sm font-medium mb-1">
                  {player2.name}
                </div>
                <div className="text-2xl font-bold text-red-400">
                  {player2Wins}
                </div>
                <div className="text-xs text-red-200">Categories Won</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h4
                className={`text-lg font-bold ${
                  player1Wins > player2Wins
                    ? "text-blue-400"
                    : player2Wins > player1Wins
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {player1Wins > player2Wins
                  ? `${player1.name} wins!`
                  : player2Wins > player1Wins
                  ? `${player2.name} wins!`
                  : "It's a tie!"}
              </h4>
              {player1Wins !== player2Wins && (
                <p className="text-gray-400 text-sm mt-1">
                  {Math.max(player1Wins, player2Wins)}-
                  {Math.min(player1Wins, player2Wins)}-{ties}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonResults;
