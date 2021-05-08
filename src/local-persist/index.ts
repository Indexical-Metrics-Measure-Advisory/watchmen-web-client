import {connectAdminDB} from './db';

export const prepareAdminDB = () => {
	connectAdminDB();
	console.info('%cLocal admin database prepared', `font-size:14px;font-variant:petite-caps;font-weight:bold;text-transform:capitalize;color:white;background-color:rgba(94,119,171,0.9);padding:2px 6px;border-radius:6px;`);
};
