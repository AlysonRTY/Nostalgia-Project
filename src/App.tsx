import { useState, useEffect } from 'react';
import './App.css';
import Player from './components/Players.tsx';
import { PlayersT } from './@types';

function App() {
  const [players, setPlayers] = useState<PlayersT>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const req = await fetch('/data/players.json');
        const res = await req.json();
        console.log(res);

        const data = res.players as PlayersT;
        console.log(data);

       const reversedData = data.reverse();

      setPlayers(reversedData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
 
    fetchPlayers();
  }, []);

  return (
    <>
      <h1>The Best 30</h1>
      {players.map((player) => (
        <Player
          key={player.id}
          name={player.name}
          image={player.image}
          desc={player.desc}
        />
      ))}
    </>
  );
}

export default App;
