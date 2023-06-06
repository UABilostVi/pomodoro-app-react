export interface ILoginPayload {
	password: string;
	email: string;
}

export interface IRegPayload extends ILoginPayload {
	username: string;
}

export interface IUserSettings {
	worktime: number;
	shortbreak: number;
	longbreak: number;
	iterations: number;
}

export interface IUserInfo {
	username: string;
	email: string;
	settings: IUserSettings;
}

export interface IAuthState {
	loading: boolean;
	error: null | any;
	success: boolean;
	userInfo: IUserInfo;
}
