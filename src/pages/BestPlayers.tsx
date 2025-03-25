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
        console.log(data);
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
    <>
      <div className="p-14 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">
            <TypeAnimation
              sequence={["The Best 30", 1000, "The Greatest Players", 1000]}
              speed={30}
              repeat={Infinity}
            />
          </h1>

          {/* Segment 30-21 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 30-21</h2>
            <PlayerList players={players} start={0} end={10} />
          </div>

          <DividerSection
            text="The competition heats up as we move into the top 20! Who will make it into the elite group?"
            onClick={scrollToTop}
          />

          {/* Segment 21-11 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 21-11</h2>
            <PlayerList players={players} start={10} end={20} />
          </div>

          <DividerSection
            text="The top 10 is within reach! These players are just a step away from greatness."
            onClick={scrollToTop}
          />

          {/* Segment 10-4 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 10-4</h2>
            <PlayerList players={players} start={20} end={27} />
          </div>

          <DividerSection
            text="The moment you've been waiting for! The top 3 players are here. Who will claim the crown?"
            onClick={scrollToTop}
          />

          {/* Segment Top 3 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Top 3 Players</h2>
            <PlayerList players={players} start={27} end={30} isTop3={true} />
          </div>
        </div>

        <ToTopBtn onClick={scrollToTop} aria-label="Scroll to top" />
      </div>
    </>
  );
}
export default BestPlayers;
