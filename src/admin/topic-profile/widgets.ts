import styled, {keyframes} from 'styled-components';
import {DIALOG_Z_INDEX} from '../../basic-widgets/constants';

const ShowDialog = keyframes`
	from {
		opacity: 0;
		transform: scale3d(1, 0, 1);
		transform-origin: 50% 20%;
		pointer-events: none;
	}
	to {
		opacity: 1;
		transform: scale3d(1, 1, 1);
		transform-origin: 50% 20%;
		pointer-events: auto;
	}
`;
const HideDialog = keyframes`
	from {
		opacity: 1;
		transform: scale3d(1, 1, 1);
		transform-origin: 50% 20%;
		pointer-events: auto;
	}
	to {
		opacity: 0;
		transform: scale3d(1, 0, 1);
		transform-origin: 50% 20%;
		pointer-events: none;
	}
`;

export const TopicProfileDialog = styled.div.attrs<{ visible: boolean }>(() => {
	return {
		'data-widget': 'topic-profile-dialog'
	};
})<{ visible: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: transparent;
	animation: ${({visible}) => visible ? ShowDialog : HideDialog} 300ms ease-in-out;
	z-index: ${DIALOG_Z_INDEX - 1};
`;

export const TopicProfileDialogWrapper = styled.div.attrs({'data-widget': 'topic-profile-dialog-wrapper'})`
	margin-top: 5vh;
	margin-left: 5vw;
	width: 90vw;
	height: 90vh;
	padding: calc(var(--margin) / 2) var(--margin) calc(var(--margin) / 2) var(--margin);
	display: flex;
	flex-direction: column;
	background-color: var(--bg-color);
	border-radius: var(--border-radius);
	border: var(--border);
	box-shadow: var(--dialog-box-shadow);
`;

export const TopicProfileDialogHeader = styled.div.attrs({'data-widget': 'topic-profile-dialog-header'})`
	display: flex;
	align-items: center;
	height: var(--header-height);
	font-family: var(--title-font-family);
	font-size: 2em;
`;
export const TopicProfileDialogBody = styled.div.attrs({'data-widget': 'topic-profile-dialog-body'})`
	display: flex;
	flex-grow: 1;
	align-items: center;
`;

export const TopicProfileDialogFooter = styled.div.attrs({'data-widget': 'topic-profile-dialog-footer'})`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: var(--header-height);
`;
