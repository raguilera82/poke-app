<script setup lang="ts">
import { cardBloc } from "@core/blocs/cards/card.bloc";
import { type CardBlocState, cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import "@ui/components/cards-list.element";
import "@ui/components/text-input.element";
import { onMounted, onUnmounted, ref } from "vue";

import type { CardList } from "@ui/components/cards-list.element";
import type { Ref } from "vue";

const cardListRef: Ref<CardList | null> = ref(null);

const filterByName = (event: { detail: string }) => {
	cardBloc.filterByName(event.detail);
};

onMounted(async () => {
	const unsubscribeCardStore = cardStore.subscribe((state: CardBlocState) => {
		if (cardListRef.value) {
			cardListRef.value.cards = [...state.filteredCards];
		}
	});

	const cards = await cardBloc.getAllCards();
	notiBloc.showInfo("Cards loaded");

	if (cardListRef.value) {
		cardListRef.value.cards = [...cards];
	}

	onUnmounted(() => {
		unsubscribeCardStore();
	});
});
</script>

<template>
	<h1>Vue Pokemóns</h1>
	<poke-text-input buttonText="Filter" @on-submit="filterByName"></poke-text-input>
	<poke-cards-list ref="cardListRef"></poke-cards-list>
</template>
