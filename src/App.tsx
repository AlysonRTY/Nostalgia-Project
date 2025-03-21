import { useState, useEffect } from 'react';
import './App.css';
import PlayerList from './components/PlayerList'; // Import the new component
import DividerSection from './components/DividerSection';
import ToTopBtn from './components/ToTopBtn';
import { PlayersT } from './@types';

function App() {
  const [players, setPlayers] = useState<PlayersT>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const req = await fetch('/data/players.json');
        const res = await req.json();
        const data = res.players as PlayersT;
        setPlayers(data.reverse());
        console.log(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            FIFA 17 Trailer
          </h1>
          <div className="relative aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/l1FJfr_spJQ?si=9365aQ0UQ4LbVhZd"
              title="FIFA 17 Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">The Best 30</h1>

          {/* Segment 30-21 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 30-21</h2>
            <PlayerList players={players} start={0} end={10} />
          </div>

          {/* Divider: 30-21 to 21-11 */}
          <DividerSection
            text="The competition heats up as we move into the top 20! Who will make it into the elite group?"
            onClick={scrollToTop}
          />

          {/* Segment 21-11 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 21-11</h2>
            <PlayerList players={players} start={10} end={20} />
          </div>

          {/* Divider: 21-11 to 10-4 */}
          <DividerSection
            text="The top 10 is within reach! These players are just a step away from greatness."
            onClick={scrollToTop}
          />

          {/* Segment 10-4 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Players 10-4</h2>
            <PlayerList players={players} start={20} end={27} />
          </div>

          {/* Divider: 10-4 to Top 3 */}
          <DividerSection
            text="The moment you've been waiting for! The top 3 players are here. Who will claim the crown?"
            isBold
            onClick={scrollToTop}
          />

          {/* Segment Top 3 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Top 3 Players</h2>
            <PlayerList players={players} start={27} end={30} isTop3={true} />
          </div>
        </div>

        {/* "Go to Top" Button */}
        <ToTopBtn onClick={scrollToTop} />
      </div>
    </>
  );
}

export default App;
