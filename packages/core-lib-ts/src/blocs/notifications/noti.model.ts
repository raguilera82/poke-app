export type NotiType = {
	msg: string;
	type: string;
};

export class Noti {
	msg: string;
	type: string;

	constructor(noti: NotiType) {
		this.msg = noti.msg;
		this.type = noti.type;
	}
}
