<script setup>
import { onMounted, ref } from "vue";
import { cardBloc } from "../../core-lib-ts/src/blocs/cards/card.bloc";
import { notiBloc } from "../../core-lib-ts/src/blocs/notifications/noti.bloc";
import "../../core-ui/src/components/cards-list.element";

const cardListRef = ref(null);

onMounted(async () => {
	notiBloc.subscribe((state) => {
		console.log(JSON.stringify(state));
	});

	notiBloc.showInfo("Se mostrará?");

	const cards = await cardBloc.getAllCards();
	console.log(JSON.stringify(cards));

	if (cardListRef.value) {
		cardListRef.value.cards = cards;
	}
});
</script>

<template>
  <poke-cards-list ref="cardListRef"></poke-cards-list>
</template>

<style scoped></style>
