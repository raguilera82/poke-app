import { useEffect, useRef, useState } from "react";
import { cardBloc } from "../../../core-lib-ts/src/blocs/cards/card.bloc";
import { notiBloc } from "../../../core-lib-ts/src/blocs/notifications/noti.bloc";
import "../../../core-ui/src/components/cards-list.element.js";
import "../../../core-ui/src/components/text-input.element.js";

function Home() {
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
		const textInput = document.querySelector("poke-text-input");
		if (textInput) {
			textInput.addEventListener("on-submit", handleFilter);
			return () => textInput.removeEventListener("on-submit", handleFilter);
		}
	}, []);

	const handleFilter = async (event) => {
		const query = event.detail;
		try {
			const filteredCards = cardBloc.filterByName(query);
			setCards(filteredCards);
		} catch (error) {
			console.error("Error filtering cards:", error);
		}
	};

	return (
		<main>
			<h1>React Pokemóns</h1>
			<poke-text-input buttonText="Filter" />
			<poke-cards-list ref={cardListRef} />
		</main>
	);
}

export default Home;
