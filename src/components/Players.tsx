import { Link } from "react-router";
import { PlayerT } from "../@types";

function Player(props: PlayerT & { isTop3: boolean; rank: number }) {
  return (
    <Link to={`/player-details/${props.name}`} className="block">
      <div
        className={`flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md mb-8 relative overflow-hidden ${
          props.isTop3
            ? "border-2 border-transparent hover:border-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            : ""
        }`}
      >
        <div
          className={`absolute inset-0 z-0 animate-pulse-slow ${
            props.isTop3
              ? "bg-gradient-to-r from-yellow-500 via-neutral-200 to-yellow-300"
              : "bg-gradient-to-r from-zinc-800 via-yellow-300 to-zinc-800"
          } opacity-10`}
        ></div>

        <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0 flex justify-center relative">
          <img
            src={props.image}
            alt={props.name}
            className={`w-full max-w-xs object-contain rounded-lg ${
              props.isTop3 ? "h-96" : "h-64 md:h-80"
            }`}
          />
        </div>

        {/* Player Details */}
        <div className="w-full md:w-1/2 lg:w-2/3 md:pl-8 relative z-10">
          <h2 className="text-3xl font-bold mb-4">{props.name}</h2>
          <p className="text-gray-700 mb-6">{props.desc}</p>

          {/* Additional Details (Rank, Position, Club, Nation) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-sm text-gray-500">Rank</span>
              <p className="text-lg font-semibold">#{props.rank}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Position</span>
              <p className="text-lg font-semibold">{props.position}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Club</span>
              <p className="text-lg font-semibold">{props.club}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Nation</span>
              <p className="text-lg font-semibold">{props.nation}</p>
            </div>
          </div>
        </div>

        {/* Top 3 Badge */}
        {props.isTop3 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
            Goats
          </div>
        )}
      </div>
    </Link>
  );
}

export default Player;
