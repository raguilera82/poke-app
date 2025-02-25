import { cardBloc } from "@core/blocs/cards/card.bloc";
import { cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";
import { useEffect, useRef, useState } from "react";

function Home() {
	const [cards, setCards] = useState([]);
	const cardListRef = useRef(null);

	useEffect(() => {
		cardStore.subscribe((state) => {
			setCards(state.filteredCards);
		});
	}, []);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const allCards = await cardBloc.getAllCards();
				setCards(allCards);
				notiBloc.showInfo("Cards fetched successfully");
				notiStore.subscribe((state) => console.log(state));
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

	const handleFilter = async (event: CustomEvent<string>) => {
		const query = event.detail;
		try {
			cardBloc.filterByName(query);
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

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"poke-text-input": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				buttonText?: string;
			};
			"poke-cards-list": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}
