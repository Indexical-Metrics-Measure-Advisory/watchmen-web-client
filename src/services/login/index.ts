import { saveTokenIntoSession } from '../account';
import { mockLogin } from '../mock/mock-login';
import { doFetch, getServiceHost, isMockService } from '../utils';
import { Account, LoginResponse } from './types';

const isAdmin = (loginResult: any) => {
	return loginResult.role === 'admin';
};

export const login = async (account: Account): Promise<LoginResponse> => {
	if (isMockService()) {
		return mockLogin(account);
	} else {
		const response = await doFetch(`${getServiceHost()}login/access-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				username: account.name || '',
				password: account.credential || '',
				grant_type: 'password'
			})
		});

		const result = await response.json();
		saveTokenIntoSession(result.access_token);

		return { pass: true, admin: isAdmin(result) };
	}
};
