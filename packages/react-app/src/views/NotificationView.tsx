import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { useEffect, useState } from "react";

export function NotificationView() {
	const [notification, setNotification] = useState({
		msg: "",
		type: "INFO",
		duration: 3000,
	});

	useEffect(() => {
		const unsubscribe = notiStore.subscribe((state) => {
			if (state.noti) {
				setNotification({
					msg: state.noti.msg,
					type: state.noti.type,
					duration: state.noti.duration,
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
		></poke-notification>
	);
}
