import { Link } from "react-router";
import { PlayerT } from "../@types";

function PlayerList({
  players,
  startRank = 30,
}: {
  players: PlayerT[];
  startRank?: number;
}) {
  return (
    <>
      {players.map((player, index) => {
        const rank = startRank - index;

        return (
          <Link
            key={player.id}
            to={`/player-details/${player.name}`}
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
        );
      })}
    </>
  );
}

export default PlayerList;
