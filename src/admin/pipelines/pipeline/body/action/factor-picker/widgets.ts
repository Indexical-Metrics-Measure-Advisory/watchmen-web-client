import {Dropdown} from '@/widgets/basic/dropdown';
import styled from 'styled-components';

export const FactorFinderContainer = styled.div.attrs({'data-widget': 'factor-finder'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const FactorDropdown = styled(Dropdown)`
	align-self       : center;
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	background-color : var(--bg-color);
	border-radius    : calc(var(--param-height) / 2);
	box-shadow       : var(--param-border);
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
export const IncorrectOptionLabel = styled.span.attrs({'data-widget': 'incorrect-option'})`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
