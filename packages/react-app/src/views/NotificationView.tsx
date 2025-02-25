import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element.js";
import { useEffect, useRef } from "react";

export function NotificationView() {
	const notiRef = useRef<HTMLElement & { show: (msg: string) => void }>(null);

	useEffect(() => {
		const unsubscribe = notiStore.subscribe((state) => {
			if (state.noti && notiRef.current) {
				notiRef.current.show(state.noti.msg);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return <poke-notification ref={notiRef} />;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"poke-notification": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}
