import {v4} from 'uuid';
import {Apis, get, post} from '../apis';
import {generateUuid} from '../tuples/utils';
import {Token} from '../types';
import {isMockService} from '../utils';
import {PAT} from './pat-types';

const createToken = () => {
	return v4().replace(/-/g, '');
};
export const maskToken = (token: Token = createToken()) => {
	return token.split('').map((ch, index) => {
		if (index < 6) {
			return ch;
		} else {
			return '*';
		}
	}).join('');
};
export const fetchPATs = async (): Promise<Array<PAT>> => {
	if (isMockService()) {
		return new Promise<Array<PAT>>(resolve => {
			setTimeout(() => {
				resolve([
					{patId: '1', note: 'build', token: maskToken()},
					{patId: '2', note: 'crm-integrate', token: maskToken()}
				]);
			}, 300);
		});
	} else {
		return await get({api: Apis.PAT_LIST});
	}
};

export const createPAT = async (note: string): Promise<PAT> => {
	if (isMockService()) {
		return new Promise<PAT>(resolve => {
			setTimeout(() => {
				resolve({patId: generateUuid(), note, token: createToken()});
			}, 300);
		});
	} else {
		return await post({api: Apis.PAT_CREATE, data: {note}});
	}
};

export const deletePAT = async (patId: string) => {
	if (isMockService()) {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
			}, 300);
		});
	} else {
		return await post({api: Apis.PAT_DELETE.replace(':patId', patId)});
	}
};