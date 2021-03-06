export interface Account {
	name?: string;
	credential?: string;
}

export interface LoginResponse {
	pass: boolean;
	admin: boolean;
	super: boolean;
	error?: string;
}
