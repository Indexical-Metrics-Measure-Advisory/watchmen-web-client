export interface Account {
	name?: string;
	credential?: string;
}

export interface LoginResponse {
	pass: boolean;
	admin: boolean;
	error?: string;
}
