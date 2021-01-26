import { Account, LoginResponse } from '../login/types';

const ADMIN = 'imma-admin';
const USER = 'imma-user';

export const mockLogin = async (account: Account): Promise<LoginResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				pass: [ ADMIN, USER ].includes(account.name || ''),
				admin: account.name === ADMIN,
				error: [ ADMIN, USER ].includes(account.name || '')
					? void 0
					: 'Name or credential cannot be identified now.'
			});
		}, 1000);
	});
};