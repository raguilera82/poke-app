<script setup>
import "@core-ui/components/cards-list.element";
import "@core-ui/components/text-input.element";
import { cardBloc } from "@core/blocs/cards/card.bloc";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import { onMounted, ref } from "vue";

const cardListRef = ref(null);

const filterByName = (event) => {
	const filteredCards = cardBloc.filterByName(event.detail);
	if (cardListRef.value) {
		cardListRef.value.cards = filteredCards;
	}
};

onMounted(async () => {
	notiBloc.store.subscribe((state) => {
		console.log(JSON.stringify(state));
	});

	notiBloc.showInfo("Se mostrará?");

	const cards = await cardBloc.getAllCards();

	if (cardListRef.value) {
		cardListRef.value.cards = cards;
	}
});
</script>

<template>
  <main>
    <h1>Vue Pokemóns</h1>
    <poke-text-input buttonText="Filter" @on-submit="filterByName"></poke-text-input>
    <poke-cards-list ref="cardListRef"></poke-cards-list>
  </main>
</template>
