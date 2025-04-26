import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { useEffect, useState } from "react";

export function NotificationView() {
	const [notification, setNotification] = useState({
		msg: "",
		type: "INFO",
		duration: 3000,
		key: 0,
	});

	useEffect(() => {
		const unsubscribe = notiStore.subscribe((state) => {
			if (state.noti) {
				console.log("Notification state changed:", state.noti);
				setNotification({
					msg: state.noti.msg,
					type: state.noti.type,
					duration: state.noti.duration,
					key: Date.now(),
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<poke-notification
			msg={notification.msg}
			type={notification.type}
			duration={notification.duration}
			key={notification.key}
		/>
	);
}
