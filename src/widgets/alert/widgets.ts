import styled from 'styled-components';
import {ALERT_Z_INDEX} from '../basic/constants';

export const AlertContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'alert',
		style: {
			opacity: visible ? 1 : (void 0),
			pointerEvents: visible ? 'auto' : (void 0)
		}
	};
})<{ visible: boolean }>`
	position         : fixed;
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	background-color : transparent;
	opacity          : 0;
	pointer-events   : none;
	transition       : all 300ms ease-in-out;
	z-index          : ${ALERT_Z_INDEX};
`;
export const AlertDialog = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'alert-dialog',
		style: {
			transform: visible ? 'none' : (void 0)
		}
	};
})<{ visible: boolean }>`
	display          : flex;
	flex-direction   : column;
	width            : 400px;
	margin-top       : 25vh;
	margin-left      : calc(50% - 200px);
	padding          : var(--margin) var(--margin) calc(var(--margin) / 2) var(--margin);
	background-color : var(--bg-color);
	border-radius    : var(--border-radius);
	box-shadow       : var(--dialog-box-shadow);
	transform        : scale(0.75);
	transition       : all 300ms ease-in-out;
`;
export const AlertBody = styled.div.attrs({'data-widget': 'alert-body', 'data-v-scroll': ''})`
	flex-grow     : 1;
	min-height    : 60px;
	max-height    : 30vh;
	margin-bottom : var(--margin);
	overflow      : auto;
`;
export const AlertFooter = styled.div.attrs({'data-widget': 'alert-footer'})`
	display         : flex;
	justify-content : flex-end;
`;
export const AlertLabel = styled.span.attrs({'data-widget': 'alert-label'})`
	font-variant : petite-caps;
`;
export const SingleLineAlertLabel = styled.div.attrs({'data-widget': 'alert-label'})`
	font-variant : petite-caps;
`;
export const WaitRemoveDataDialog = styled(AlertDialog)`
	padding : calc(var(--margin) / 2) var(--margin);
`;
export const WaitRemoteDataBody = styled(AlertBody)`
	min-height : unset;
`;
