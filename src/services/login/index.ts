import {saveTokenIntoSession} from '../account';
import {Apis} from '../apis';
import {mockLogin} from '../mock/mock-login';
import {doFetch, getServiceHost, isMockService} from '../utils';
import {Account, LoginResponse} from './types';

const isAdmin = (loginResult: any) => {
	return loginResult.role === 'admin' || loginResult.role === 'superadmin';
};
const isSuperAdmin = (loginResult: any) => {
	return loginResult.role === 'superadmin';
};

export const login = async (account: Account): Promise<LoginResponse> => {
	if (isMockService()) {
		return mockLogin(account);
	} else {
		const data: { [key in string]: string } = {
			username: account.name || '',
			password: account.credential || '',
			grant_type: 'password'
		};
		const body = Object.keys(data).reduce((pairs, key) => {
			pairs.push(`${key}=${encodeURIComponent(data[key])}`);
			return pairs;
		}, [] as Array<string>).join('&');
		const response = await doFetch(`${getServiceHost()}${Apis.LOGIN}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body
		});

		const result = await response.json();
		saveTokenIntoSession(result.access_token);

		return {pass: true, admin: isAdmin(result), super: isSuperAdmin(result)};
	}
};
