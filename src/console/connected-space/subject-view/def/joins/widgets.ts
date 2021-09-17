import {DROPDOWN_Z_INDEX} from '@/widgets/basic/constants';
import styled from 'styled-components';

export const JoinsContainer = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'subject-def-joins',
		'data-v-scroll': '',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	overflow-y     : auto;
	overflow-x     : hidden;
	border-right   : var(--border);
`;
export const JoinsBottomGap = styled.div.attrs({'data-widget': 'subject-def-joins-bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const JoinsEditContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'subject-def-joins-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin) 0 0;
`;
export const JoinEditContainer = styled.div.attrs({'data-widget': 'subject-def-join-edit'})`
	display               : grid;
	grid-template-columns : var(--margin) 1fr auto 1fr auto;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	padding-bottom        : calc(var(--margin) / 4);
`;
export const JoinTopicFactorEditContainer = styled.div.attrs({'data-widget': 'subject-def-join-edit-wrapper'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : calc(var(--margin) / 4);
	align-self            : stretch;
	justify-self          : stretch;
	> div[data-widget="parameter-topic-factor-edit"] {
		> div[data-widget="dropdown"]:first-child {
			border-top-left-radius    : calc(var(--param-height) / 2);
			border-bottom-left-radius : calc(var(--param-height) / 2);
			box-shadow                : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
			&:hover,
			&:focus {
				box-shadow : var(--primary-hover-shadow);
			}
		}
		> div[data-widget="dropdown"]:last-child {
			border-top-right-radius    : calc(var(--param-height) / 2);
			border-bottom-right-radius : calc(var(--param-height) / 2);
			box-shadow                 : var(--param-border);
			&:hover,
			&:focus {
				box-shadow : var(--primary-hover-shadow);
			}
		}
	}
`;
export const JoinIndex = styled.span.attrs({'data-widget': 'subject-def-join-index'})`
	justify-self : end;
	line-height  : var(--param-height);
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
const JOIN_TYPE_WIDTH = 200;
export const JoinTypeDropdownContainer = styled.div.attrs<{ top?: number, bottom?: number }>(({top, bottom}) => {
	return {
		'data-widget': 'subject-def-join-type',
		style: {
			borderBottomLeftRadius: top ? 0 : (void 0),
			borderBottomRightRadius: top ? 0 : (void 0),
			borderTopLeftRadius: bottom ? 0 : (void 0),
			borderTopRightRadius: bottom ? 0 : (void 0)
		}
	};
})<{ top?: number, bottom?: number }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	height           : var(--param-height);
	width            : ${JOIN_TYPE_WIDTH}px;
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	border-radius    : calc(var(--param-height) / 2);
	background-color : var(--param-bg-color);
	white-space      : nowrap;
	cursor           : pointer;
	box-shadow       : var(--param-border);
	&:before,
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 50%;
		height           : 1px;
		width            : calc(var(--margin) / 2 - 1px);
		background-color : var(--param-bg-color);
	}
	&:before {
		left : calc(var(--margin) / -2);
	}
	&:after {
		left : 100%;
	}
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
	> svg {
		font-size   : 0.8em;
		margin-left : calc(var(--margin) / 4);
	}
`;
export const JoinTypeDropdown = styled.div.attrs<{ visible: boolean, top?: number, bottom?: number, left: number }>(
	({visible, top, bottom, left}) => {
		return {
			'data-widget': 'join-type-dropdown',
			style: {
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? 'auto' : 'none',
				top, bottom, left,
				transition: visible ? (void 0) : 'none',
				borderTopLeftRadius: top ? 0 : (void 0),
				borderTopRightRadius: top ? 0 : (void 0),
				borderBottomLeftRadius: bottom ? 0 : (void 0),
				borderBottomRightRadius: bottom ? 0 : (void 0)
			}
		};
	})<{ visible: boolean, top?: number, bottom?: number, left: number }>`
	display          : flex;
	position         : fixed;
	flex-direction   : column;
	background-color : var(--bg-color);
	width            : ${JOIN_TYPE_WIDTH}px;
	border-radius    : var(--border-radius);
	box-shadow       : var(--param-border);
	z-index          : ${DROPDOWN_Z_INDEX};
	overflow         : hidden;
	transition       : opacity 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const JoinTypeDropdownOption = styled.div.attrs({'data-widget': 'join-type-dropdown-option'})`
	display         : flex;
	align-items     : center;
	justify-content : center;
	padding         : 0 calc(var(--margin) / 2);
	height          : var(--height);
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const RemoveJoinIcon = styled.div.attrs({'data-widget': 'join-remove-icon'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 4);
	height        : var(--param-height);
	border-radius : calc(var(--param-height) / 2);
	color         : var(--border-color);
	cursor        : pointer;
	box-shadow    : var(--param-border);
	transition    : box-shadow 300ms ease-in-out;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		left             : calc(var(--margin) / -2);
		top              : 50%;
		height           : 1px;
		width            : calc(var(--margin) / 2 - 1px);
		background-color : var(--param-bg-color);
	}
	&:hover {
		z-index          : 1;
		color            : var(--danger-color);
		background-color : var(--bg-color);
		box-shadow       : var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;

