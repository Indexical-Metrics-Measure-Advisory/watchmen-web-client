import {Dropdown} from '@/widgets/basic/dropdown';
import styled from 'styled-components';

export const TopicFactorEditContainer = styled.div.attrs({'data-widget': 'parameter-topic-factor-edit'})`
	display               : grid;
	grid-template-columns : 50% 50%;
	position              : relative;
	//align-self            : stretch;
	align-items           : center;
	height                : var(--param-height);
`;
export const TopicDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div {
			border     : 0;
			box-shadow : var(--param-border);
		}
	}
`;
export const FactorDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div {
			border     : 0;
			box-shadow : var(--param-border);
		}
	}
`;
export const IncorrectOptionLabel = styled.span.attrs({'data-widget': 'incorrect-option'})`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
