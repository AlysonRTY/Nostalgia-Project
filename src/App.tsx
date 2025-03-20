import { useState, useEffect } from 'react';
import './App.css'; // Ensure this file contains the custom Tailwind class
import Player from './components/Players.tsx';
import FadeIn from './components/FadeIn.tsx';
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
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reusable Divider Section Component
  const DividerSection = ({ text, isBold = false }: { text: string; isBold?: boolean }) => (
    <div className="flex flex-col items-center justify-end mb-12 h-96 rounded-lg relative bg-divider-image">
      <FadeIn>
        <p className={`text-xl text-center mb-4 text-white ${isBold ? 'font-bold' : ''}`}>
          {text}
        </p>
        <div className="flex justify-center w-full pb-8">
          <button
            onClick={scrollToTop}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Go to Top ↑
          </button>
        </div>
      </FadeIn>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">The Best 30</h1>

        {/* Segment 30-21 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Players 30-21</h2>
          {players.slice(0, 10).map((player) => (
            <Player key={player.id} {...player} rank={parseInt(player.id || '0', 10)} />
          ))}
        </div>

        {/* Divider: 30-21 to 21-11 */}
        <DividerSection
          text="The competition heats up as we move into the top 20! Who will make it into the elite group?"
        />

        {/* Segment 21-11 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Players 21-11</h2>
          {players.slice(10, 20).map((player) => (
            <Player key={player.id} {...player} rank={parseInt(player.id || '0', 10)} />
          ))}
        </div>

        {/* Divider: 21-11 to 10-4 */}
        <DividerSection
          text="The top 10 is within reach! These players are just a step away from greatness."
        />

        {/* Segment 10-4 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Players 10-4</h2>
          {players.slice(20, 27).map((player) => (
            <Player key={player.id} {...player} rank={parseInt(player.id || '0', 10)} />
          ))}
        </div>

        {/* Divider: 10-4 to Top 3 */}
        <DividerSection
          text="The moment you've been waiting for! The top 3 players are here. Who will claim the crown?"
          isBold
        />

        {/* Segment Top 3 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Top 3 Players</h2>
          {players.slice(27, 30).map((player) => (
            <Player
              key={player.id}
              {...player}
              rank={parseInt(player.id || '0', 10)}
              isTop3={true}
            />
          ))}
        </div>
      </div>

      {/* "Go to Top" Button */}
      <button
        onClick={scrollToTop}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
        ↑
      </button>
    </div>
  );
}

export default App;
