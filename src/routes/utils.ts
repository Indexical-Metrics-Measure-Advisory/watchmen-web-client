import { matchPath } from 'react-router-dom';
import { Router } from './types';

export const isConnectedSpaceOpened = (connectId: string): boolean => {
	const match = matchPath<{ connectId: string }>(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE);
	// eslint-disable-next-line
	return !!match && match.params.connectId == connectId;
};
export const toConnectedSpace = (path: string, connectId: string) => path.replace(':connectId', connectId);
