import { useEffect, useRef, useState } from "react";
import { cardBloc } from "../../core-lib-ts/src/blocs/cards/card.bloc";
import { notiBloc } from "../../core-lib-ts/src/blocs/notifications/noti.bloc";
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
				notiBloc.showInfo("Cards fetched successfully");
				notiBloc.store.subscribe((state) => console.log(state));
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
				<poke-cards-list ref={cardListRef} />
			</main>
		</>
	);
}

export default App;
