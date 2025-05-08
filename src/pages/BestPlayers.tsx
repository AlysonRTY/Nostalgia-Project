import { TypeAnimation } from "react-type-animation";
import PlayerList from "../components/PlayerList";
import DividerSection from "../components/DividerSection";
import ToTopBtn from "../components/ToTopBtn";
import { useEffect, useState } from "react";
import { PlayersT } from "../@types";

function BestPlayers() {
  const [players, setPlayers] = useState<PlayersT>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const req = await fetch("/data/players.json");
        const res = await req.json();
        const data = res.players as PlayersT;
        setPlayers(data.reverse());
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <TypeAnimation
              sequence={["The Best 30", 1000, "The Greatest Players", 1000]}
              speed={30}
              repeat={Infinity}
              wrapper="span"
            />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the top players in FIFA 17 ranked by their skills,
            performance, and impact on the game.
          </p>
        </div>

        {/* Segment 30-21 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
            Players 30-21
          </h2>
          <PlayerList players={players.slice(0, 10)} startRank={30} />
        </div>

        <DividerSection
          text="The competition heats up as we move into the top 20! Who will make it into the elite group?"
          onClick={scrollToTop}
        />

        {/* Segment 21-11 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
            Players 21-11
          </h2>
          <PlayerList players={players.slice(10, 20)} startRank={20} />
        </div>

        <DividerSection
          text="The top 10 is within reach! These players are just a step away from greatness."
          onClick={scrollToTop}
        />

        {/* Segment 10-4 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
            Players 10-4
          </h2>
          <PlayerList players={players.slice(20, 27)} startRank={10} />
        </div>

        <DividerSection
          text="The moment you've been waiting for! The top 3 players are here. Who will claim the crown?"
          onClick={scrollToTop}
        />

        {/* Segment Top 3 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
            Top 3 Players
          </h2>
          <PlayerList players={players.slice(27, 30)} startRank={3} />
        </div>
      </div>

      <ToTopBtn onClick={scrollToTop} aria-label="Scroll to top" />
    </div>
  );
}

export default BestPlayers;
