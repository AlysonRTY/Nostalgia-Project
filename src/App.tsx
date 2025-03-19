import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Cards';
import { CardsT } from './@types';

function App() {
  const [cards, setCards] = useState<CardsT>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const req = await fetch('/data/players.json');
        const res = await req.json();
        console.log(res);

        const data = res.players as CardsT;
        console.log(data);

        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
 
    fetchCards();
  }, []);

  return (
    <>
      <h1>The Best</h1>
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          image={card.image}
          // power={card.power || 0}
        />
      ))}
    </>
  );
}

export default App;
