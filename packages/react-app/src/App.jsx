import { useEffect, useRef, useState } from "react";
import { cardBloc } from "../../core-lib-ts/src/blocs/cards/card.bloc";
import "../../core-ui/src/components/cards-list.element.js";
import "./App.css";

function App() {

  const [cards, setCards] = useState([]);
  const cardListRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const allCards = await cardBloc.getAllCards();
        setCards(allCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    if (cardListRef.current) {
      cardListRef.current.cards = cards;
    }
  }, [cards]);

  return (
    <>
      <main>
        <poke-cards-list ref={cardListRef}></poke-cards-list>
      </main>
    </>
  );
}

export default App;
