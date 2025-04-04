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
    const playerId = location.state.scrollToPlayerId;
    if (playerId) {
      // Add a small delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        const element = playerRefs.current[playerId];
        if (element) {
          element.scrollIntoView({
            behavior: "auto",
            block: "center",
          });
          // Add additional offset if needed
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
                preserveScroll: true,
              }}
              className="block"
            >
              <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md mb-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-800 via-yellow-300 to-zinc-800 opacity-10"></div>

                <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0 flex justify-center relative">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full max-w-xs object-contain rounded-lg h-64 md:h-80"
                  />
                </div>

                <div className="w-full md:w-1/2 lg:w-2/3 md:pl-8 relative z-10">
                  <h2 className="text-3xl font-bold mb-4">{player.name}</h2>
                  <p className="text-gray-700 mb-6">{player.desc}</p>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-sm text-gray-500">Rank</span>
                      <p className="text-lg font-semibold">#{rank}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Position</span>
                      <p className="text-lg font-semibold">{player.position}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Club</span>
                      <p className="text-lg font-semibold">{player.club}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Nation</span>
                      <p className="text-lg font-semibold">{player.nation}</p>
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
