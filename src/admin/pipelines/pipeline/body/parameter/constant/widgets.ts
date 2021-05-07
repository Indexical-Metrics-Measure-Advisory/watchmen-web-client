import styled from 'styled-components';
import {Input} from '../../../../../../basic-widgets/input';

export const ConstantContainer = styled.div.attrs({'data-widget': 'parameter-constant'})`
	display               : flex;
	position              : relative;
	align-items           : center;
	margin-left           : calc(var(--margin) / 2);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--height) / 2);
		left             : calc(var(--margin) / -2);
		width            : calc(var(--margin) / 2);
		height           : 1px;
		background-color : var(--border-color);
		z-index          : -1;
	}
`;
export const ConstantInput = styled(Input).attrs({'data-widget': 'parameter-constant-input'})`
	position      : relative;
	height        : var(--param-height);
	width     : 300px;
	border-radius : calc(var(--param-height) / 2);
	border        : 0;
	padding       : 0 calc(var(--margin) / 2);
	box-shadow    : var(--param-border);
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
	}
`;
