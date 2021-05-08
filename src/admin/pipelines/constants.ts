export const SAVE_TIMEOUT = (() => {
	try {
		return parseInt(process.env.REACT_APP_CLIENT_SAVE_INTERVAL || '10000');
	} catch {
		return 10000;
	}
})();