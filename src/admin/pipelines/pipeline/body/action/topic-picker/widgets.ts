import styled from 'styled-components';
import {Dropdown} from '../../../../../../basic-widgets/dropdown';

export const TopicFinderContainer = styled.div.attrs({'data-widget': 'topic-finder'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const TopicDropdown = styled(Dropdown)`
	align-self       : center;
	justify-self     : start;
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	background-color : var(--bg-color);
	border           : 0;
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