import { cardBloc } from "@core/blocs/cards/card.bloc";
import type { Card } from "@core/blocs/cards/card.model";
import { cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";
import { useEffect, useRef, useState } from "react";

export function CardsView() {
	const [cards, setCards] = useState<ReadonlyArray<Card>>([]);
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
				console.error("Error fetching cards:", error.errors);
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
			textInput.addEventListener("on-reset", handleReset);
			return () => {
				textInput.removeEventListener("on-submit", handleFilter);
				textInput.removeEventListener("on-reset", handleReset);
			};
		}
	}, []);

	const handleReset = async () => {
		await cardBloc.getAllCards();
	};

	const handleFilter = async (event: CustomEvent<string>) => {
		const query = event.detail;
		try {
			cardBloc.filterByName(query);
		} catch (error) {
			console.error("Error filtering cards:", JSON.stringify(error.errors));
			notiBloc.showWarning(error.errors.byName[0]);
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
