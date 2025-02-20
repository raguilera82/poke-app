//@ts-check

import { describe, expect, it } from "vitest";
import { notiBloc } from "./noti.bloc";

describe("Noti BLoC", () => {
	it("should info notification", async () => {
		const msg = "Important info";

		notiBloc.showInfo(msg);

		const noti = notiBloc.getState().noti;
		expect(noti.msg).toEqual(msg);
		expect(noti.type).toEqual("INFO");
	});
});
