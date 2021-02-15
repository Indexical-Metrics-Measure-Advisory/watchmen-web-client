import styled from 'styled-components';
import { Dropdown } from '../../../../../../../basic-widgets/dropdown';

export const TopicFactorEditContainer = styled.div.attrs({ 'data-widget': 'parameter-topic-factor-edit' })`
	display               : grid;
	grid-template-columns : auto auto 1fr;
	position              : relative;
	align-self            : center;
	align-items           : center;
	height                : var(--param-height);
	margin-left           : calc(var(--margin) / 2);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--param-height) / 2);
		left             : calc(var(--margin) / -2);
		width            : calc(var(--margin) / 2);
		height           : 1px;
		background-color : var(--border-color);
		z-index          : -1;
	}
`;
export const TFDropdown = styled(Dropdown)`
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	background-color : var(--bg-color);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div {
			border     : 0;
			box-shadow : var(--param-border);
		}
	}
	> span[data-widget="dropdown-label"] {
		min-width : 120px;
	}
	> div[data-widget="dropdown-options-container"] > span {
		padding : 0 calc(var(--margin) / 2);
	}
`;
export const TopicDropdown = styled(TFDropdown)`
	border-radius : calc(var(--param-height) / 2) 0 0 calc(var(--param-height) / 2);
	box-shadow    : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
`;
export const FactorDropdown = styled(TFDropdown)`
	border-radius : 0 calc(var(--param-height) / 2) calc(var(--param-height) / 2) 0;
	box-shadow    : var(--param-border);
`;
export const IncorrectOptionLabel = styled.span.attrs({ 'data-widget': 'incorrect-option' })`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
