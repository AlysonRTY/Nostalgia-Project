import { Link, useLocation } from "react-router";
import { PlayerT } from "../@types";
import { useEffect, useRef } from "react";

function PlayerList({
  players,
  startRank = 30,
}: {
  players: PlayerT[];
  startRank?: number;
}) {
  const playerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();

  useEffect(() => {
    const playerId = location.state?.scrollToPlayerId;
    if (playerId) {
      const timer = setTimeout(() => {
        const element = playerRefs.current[playerId];
        if (element) {
          element.scrollIntoView({
            behavior: "auto",
            block: "center",
          });
          window.scrollBy(0, -50);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      {players.map((player, index) => {
        const rank = startRank - index;

        return (
          <div
            key={player.id}
            ref={(currentPlayer) => {
              playerRefs.current[player.id] = currentPlayer;
            }}
          >
            <Link
              to={`/player-details/${player.name}`}
              state={{
                scrollToPlayerId: player.id,
                preserveScroll: false,
              }}
              className="block"
            >
              <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded-xl shadow-2xl mb-6 relative overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/20 via-blue-700/10 to-blue-900/20"></div>

                {/* Rank Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                  #{rank}
                </div>

                <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center relative">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full max-w-xs object-contain rounded-lg h-48 md:h-56"
                  />
                </div>

                <div className="w-full md:w-2/3 md:pl-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                      {player.name}
                    </h2>
                  </div>

                  <p className="text-gray-400 mb-6">{player.desc}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-1">
                        Club
                      </span>
                      <p className="text-lg font-semibold text-white">
                        {player.club}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <span className="text-xs text-gray-400 block mb-1">
                        Nation
                      </span>
                      <p className="text-lg font-semibold text-white">
                        {player.nation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default PlayerList;
