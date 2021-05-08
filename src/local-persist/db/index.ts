import {AdminDatabase} from './admin';

const adminDB = new AdminDatabase();

export const connectAdminDB = (): AdminDatabase => {
	return adminDB;
};