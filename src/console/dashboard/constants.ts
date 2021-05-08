export const REPORT_AUTO_REFRESH_INTERVAL = (() => {
	try {
		const x = parseInt(process.env.REACT_APP_CLIENT_REPORT_AUTO_REFRESH_INTERVAL || '300000');
		return Math.max(x, 300000);
	} catch {
		return 300000;
	}
})();