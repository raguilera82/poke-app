type NotiType = Readonly<{
	msg: string;
	type: string;
}>;

export class Noti {
	readonly msg: string;
	readonly type: string;

	constructor(noti: NotiType) {
		this.msg = noti.msg;
		this.type = noti.type;
	}
}
