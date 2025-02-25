import { cardBloc } from "@core/blocs/cards/card.bloc";
import { cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";
import { useEffect, useRef, useState } from "react";

export function CardsView() {
	const [cards, setCards] = useState([]);
	const cardListRef = useRef(null);

	useEffect(() => {
		const unsubscribe = cardStore.subscribe((state) => {
			setCards(state.filteredCards);
		});
		return () => {
			console.log("Unsubscribing from cardStore");
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const allCards = await cardBloc.getAllCards();
				setCards(allCards);
				notiBloc.showInfo("Cards loaded");
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
		<>
			<h1>React Pokemóns</h1>
			<poke-text-input buttonText="Filter" />
			<poke-cards-list ref={cardListRef} />
		</>
	);
}

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
