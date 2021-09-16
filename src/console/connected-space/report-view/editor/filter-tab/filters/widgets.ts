import styled from 'styled-components';

export const FiltersContainer = styled.div.attrs({'data-widget': 'report-filters'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	border-right   : var(--border);
`;
export const FiltersEditContainer = styled.div.attrs({'data-widget': 'report-filters-edit'})`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin) var(--margin) calc(var(--margin) / 2);
	div[data-widget=parameter-topic-factor-edit] {
		grid-template-columns : 1fr;
		> div[data-widget=dropdown]:first-child {
			display : none;
		}
	}
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
