import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const AdapterFinderContainer = styled.div.attrs({'data-widget': 'external-writer-adapter-finder'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const AdapterDropdown = styled(Dropdown)`
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
export const EventCodeInputContainer = styled.div.attrs({'data-widget': 'external-writer-event-code'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	align-items           : center;
	justify-self          : start;
`;
export const EventCodeLabel = styled.div.attrs({'data-widget': 'external-writer-event-code-label'})`
	opacity       : 0;
	min-width     : 400px;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const EventCodeInput = styled(Input)`
	position         : absolute;
	width            : 100%;
	align-self       : center;
	height           : var(--param-height);
	background-color : var(--bg-color);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	border-radius    : calc(var(--param-height) / 2);
	box-shadow       : var(--param-border);
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;