<script setup>
import { onMounted, ref } from "vue";
import { cardBloc } from "../../core-lib-ts/src/blocs/cards/card.bloc";
import { notiBloc } from "../../core-lib-ts/src/blocs/notifications/noti.bloc";
import "../../core-ui/src/components/cards-list.element";
import "../../core-ui/src/components/text-input.element";

const cardListRef = ref(null);

const filterByName = ref((event) => {
	const filteredCards = cardBloc.filterByName(event.detail);
	if (cardListRef.value) {
		cardListRef.value.cards = filteredCards;
	}
});

const filterByHp = ref((event) => {
	const filteredCards = cardBloc.filterByHp(event.detail);
	if (cardListRef.value) {
		cardListRef.value.cards = filteredCards;
	}
});

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
  <h1>Vue Pokemóns</h1>
  <poke-text-input buttonText="Filter by name" @on-submit="filterByName"></poke-text-input>
  <poke-text-input buttonText="Filter by HP" @on-submit="filterByHp"></poke-text-input>
  <poke-cards-list ref="cardListRef"></poke-cards-list>
</template>

<style scoped></style>
