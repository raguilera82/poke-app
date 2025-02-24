<script setup lang="ts">
import { cardBloc } from "@core/blocs/cards/card.bloc";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";
import "@ui/components/cards-list.element";
import "@ui/components/text-input.element";
import { onMounted, ref } from "vue";

import type { CardList } from "@ui/components/cards-list.element";
import type { Ref } from "vue";

const cardListRef: Ref<CardList | null> = ref(null);

const filterByName = (event: { detail: string }) => {
	const filteredCards = cardBloc.filterByName(event.detail);
	if (cardListRef.value) {
		cardListRef.value.cards = filteredCards;
	}
};

onMounted(async () => {
	notiStore.subscribe((state: NotiStoreState) => {
		console.log(JSON.stringify(state.noti));
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
