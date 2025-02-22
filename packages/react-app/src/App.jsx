import { useEffect, useRef, useState } from "react";
import { cardBloc } from "../../core-lib-ts/src/blocs/cards/card.bloc";
import { notiBloc } from "../../core-lib-ts/src/blocs/notifications/noti.bloc";
import "../../core-ui/src/components/cards-list.element.js";
import "../../core-ui/src/components/text-input.element.js";
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

	useEffect(() => {
		const nameInput = document.querySelector('[data-filter="name"]');

		if (nameInput) {
			nameInput.addEventListener("on-submit", handleNameFilter);
			return () => nameInput.removeEventListener("on-submit", handleNameFilter);
		}

	}, []);

	useEffect(() => {
		const hpInput = document.querySelector('[data-filter="hp"]');

		if (hpInput) {
			hpInput.addEventListener("on-submit", handleHpFilter);
			return () => hpInput.removeEventListener("on-submit", handleHpFilter);
		}
	}, []);

	const handleNameFilter = async (event) => {
		const query = event.detail;
		try {
			const filteredCards = cardBloc.filterByName(query);
			setCards(filteredCards);
		} catch (error) {
			console.error("Error filtering cards by name:", error);
		}
	};

	const handleHpFilter = async (event) => {
		const query = event.detail;
		try {
			const filteredCards = cardBloc.filterByHp(query);
			setCards(filteredCards);
		} catch (error) {
			console.error("Error filtering cards by HP:", error);
		}
	};

	return (
		<>
			<main>
				<h1>React Pokemóns</h1>
				<poke-text-input data-filter="name" buttonText="Filter by name" />
				<poke-text-input data-filter="hp" buttonText="Filter by HP" />
				<poke-cards-list ref={cardListRef} />
			</main>
		</>
	);
}

export default App;
