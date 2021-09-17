import styled from 'styled-components';
import {REMOTE_REQUEST_INDEX} from '../basic/constants';

export const RemoteRequestContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'remote-request',
		style: {
			opacity: visible ? 0.5 : 0
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : fixed;
	right          : var(--margin);
	bottom         : var(--margin);
	font-size      : 2.5em;
	user-select    : none;
	pointer-events : none;
	z-index        : ${REMOTE_REQUEST_INDEX};
	transition     : opacity 300ms ease-in-out;
`;