import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const VariableNameInputContainer = styled.div.attrs({'data-widget': 'variable-name'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	align-items           : center;
	justify-self          : start;
`;
export const VariableNameInputLabel = styled.div.attrs({'data-widget': 'variable-name-label'})`
	opacity       : 0;
	min-width     : 400px;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const VariableNameInput = styled(Input)`
	position         : absolute;
	width            : 100%;
	align-self       : center;
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	border-radius    : calc(var(--param-height) / 2);
	background-color : var(--bg-color);
	box-shadow       : var(--param-border);
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;