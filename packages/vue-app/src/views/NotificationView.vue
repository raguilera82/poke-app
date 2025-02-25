<script setup lang="ts">
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { onMounted, onUnmounted, ref } from "vue";

const msg = ref("");
const type = ref("INFO");

onMounted(() => {
	const unsubscribe = notiStore.subscribe((state: NotiStoreState) => {
		if (state.noti) {
			msg.value = state.noti.msg;
			type.value = state.noti.type;
			const notiElement = document.querySelector("poke-notification");
			if (notiElement) {
				(notiElement as HTMLElement & { show: (msg: string) => void }).show(
					msg.value,
				);
			}
		}
	});

	onUnmounted(() => {
		unsubscribe();
	});
});
</script>

<template>
  <poke-notification :msg="msg" :type="type"></poke-notification>
</template>
