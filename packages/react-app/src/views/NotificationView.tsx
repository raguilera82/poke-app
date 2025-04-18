import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { useEffect, useRef } from "react";

export function NotificationView() {
	const notiRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const unsubscribe = notiStore.subscribe((state) => {
			if (state.noti && notiRef.current) {
				Object.assign(notiRef.current, {
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
