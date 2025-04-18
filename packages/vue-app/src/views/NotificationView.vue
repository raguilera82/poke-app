<script setup lang="ts">
import type { Noti } from "@core/blocs/notifications/noti.model";
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { onMounted, onUnmounted, ref } from "vue";

const msg = ref("");
const type = ref("INFO");
const duration = ref(3000);

onMounted(() => {
	const unsubscribe = notiStore.subscribe((state: NotiStoreState) => {
		if (state.noti) {
			const noti: Noti = state.noti;
			msg.value = noti.msg;
			type.value = noti.type;
			duration.value = noti.duration;
		}
	});

	onUnmounted(() => {
		unsubscribe();
	});
});
</script>

<template>
	<poke-notification :msg="msg" :type="type" :duration="duration"></poke-notification>
</template>
