export const SAVE_TIMEOUT = (() => {
	try {
		return parseInt(process.env.REACT_APP_CLIENT_SAVE_INTERVAL || '10000');
	} catch {
		return 10000;
	}
})();
export const REPORT_AUTO_REFRESH_INTERVAL = (() => {
	try {
		return parseInt(process.env.REACT_APP_CLIENT_REPORT_AUTO_REFRESH_INTERVAL || '300000');
	} catch {
		return 300000;
	}
})();