type NotiType = Readonly<{
	msg: string;
	type: string;
	duration: number;
}>;

export class Noti {
	readonly msg: string;
	readonly type: string;
	readonly duration: number;

	constructor(noti: NotiType) {
		this.msg = noti.msg;
		this.type = noti.type;
		this.duration = noti.duration;
	}
}
