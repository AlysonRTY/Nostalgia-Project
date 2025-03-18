import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Cards';
import { CardsT } from './@types';

function App() {
  const [cards, setCards] = useState<CardsT>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const req = await fetch('https://api.magicthegathering.io/v1/cards');
        const res = await req.json();
        console.log(res);

        const data = res.cards as CardsT;
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
      <h1>Magic: The Gathering Cards</h1>
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          // imageUrl={card.imageUrl}
          power={card.power || 0}
        />
      ))}
    </>
  );
}

export default App;
