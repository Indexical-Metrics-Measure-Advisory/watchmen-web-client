export const SAVE_TIMEOUT = (() => {
	try {
		const x = parseInt(process.env.REACT_APP_CLIENT_SAVE_INTERVAL || '2000');
		return Math.min(x, 10000);
	} catch {
		return 10000;
	}
})();
export const REPORT_AUTO_REFRESH_INTERVAL = (() => {
	try {
		const x = parseInt(process.env.REACT_APP_CLIENT_REPORT_AUTO_REFRESH_INTERVAL || '300000');
		return Math.max(x, 300000);
	} catch {
		return 300000;
	}
})();