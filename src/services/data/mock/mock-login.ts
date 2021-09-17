import {Account, LoginResponse} from '../login/types';

const SUPER_ADMIN = 'imma-super';
const ADMIN = 'imma-admin';
const USER = 'imma-user';

export const mockLogin = async (account: Account): Promise<LoginResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				pass: [SUPER_ADMIN, ADMIN, USER].includes(account.name || ''),
				admin: account.name === ADMIN,
				super: account.name === SUPER_ADMIN,
				tenantId: account.name === SUPER_ADMIN ? (void 0) : '1',
				error: [ADMIN, USER].includes(account.name || '')
					? void 0
					: 'Name or credential cannot be identified now.'
			});
		}, 1000);
	});
};