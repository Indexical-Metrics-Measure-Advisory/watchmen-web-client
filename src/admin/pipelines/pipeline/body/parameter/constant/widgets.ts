import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const ConstantContainer = styled.div.attrs({'data-widget': 'parameter-constant'})`
	display     : flex;
	position    : relative;
	align-items : center;
	margin-left : calc(var(--margin) / 2);
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
export const ConstantInput = styled(Input).attrs<{ valid: boolean }>(({valid}) => {
	return {
		'data-widget': 'parameter-constant-input',
		style: {
			color: valid ? (void 0) : 'var(--danger-color)'
		}
	};
})<{ valid: boolean }>`
	position      : relative;
	height        : var(--param-height);
	width         : 300px;
	border-radius : calc(var(--param-height) / 2);
	border        : 0;
	padding       : 0 calc(var(--margin) / 2);
	box-shadow    : ${({valid}) => valid ? 'var(--param-border)' : 'var(--param-danger-border)'};
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : ${({valid}) => valid ? 'var(--primary-hover-shadow)' : 'var(--danger-hover-shadow)'};
	}
`;
