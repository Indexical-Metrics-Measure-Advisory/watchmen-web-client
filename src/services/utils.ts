import dayjs from 'dayjs';

export const isMockService = (): boolean => process.env.REACT_APP_SERVICE_MOCK_FLAG === 'true';
export const getServiceHost = (): string => {
	if (window.location.hostname === 'localhost') {
		return process.env.REACT_APP_SERVICE_URL!;
	} else {
		return window.location.protocol + '//' + window.location.host + '/watchmen/';
	}
};

export const getCurrentTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const doFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
	const response = await fetch(input, init);

	const {ok, status, statusText} = response;

	if (ok) {
		return response;
	} else {
		// eslint-disable-next-line
		throw {
			status,
			statusText,
			response
		};
	}
};
