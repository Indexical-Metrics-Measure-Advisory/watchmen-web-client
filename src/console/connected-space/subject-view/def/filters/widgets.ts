import styled from 'styled-components';

export const FiltersContainer = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'subject-def-filters',
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
export const FiltersBottomGap = styled.div.attrs({'data-widget': 'subject-def-filters-bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const FiltersEditContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'subject-def-filters-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) calc(var(--margin) / 2) 0;
`;
export const RemoveFilterIcon = styled.div.attrs({'data-widget': 'filter-remove-icon'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 4);
	margin-left   : calc(var(--margin) / 2);
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
		box-shadow       : var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;
