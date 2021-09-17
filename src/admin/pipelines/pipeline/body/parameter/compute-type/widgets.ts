import styled from 'styled-components';

export const ParameterComputeTypeContainer = styled.div.attrs<{ valid: boolean }>({'data-widget': 'parameter-computed-type'})<{ valid: boolean }>`
	display          : flex;
	position         : relative;
	align-self       : start;
	align-items      : center;
	justify-self     : start;
	height           : var(--param-height);
	background-color : var(--bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 2);
	margin-top       : calc((var(--height) - var(--param-height)) / 2);
	margin-right     : var(--margin);
	cursor           : pointer;
	outline          : none;
	box-shadow       : ${({valid}) => valid ? 'var(--param-border)' : 'var(--param-danger-border)'};;
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		z-index    : 1;
		box-shadow : ${({valid}) => valid ? 'var(--primary-hover-shadow)' : 'var(--danger-hover-shadow)'};
		> div[data-widget="parameter-computed-type-label"],
		> div[data-widget="parameter-computed-type-icon"] {
			color : ${({valid}) => valid ? 'var(--warn-color)' : 'var(--danger-color)'};;
		}
	}
	&:before {
		content    : '';
		display    : block;
		position   : absolute;
		bottom     : calc(100% + 1px);
		left       : 50%;
		width      : 1px;
		height     : calc(var(--margin) / 2);
		box-shadow : var(--param-left-border);
		z-index    : -1;
	}
	> div[data-widget='parameter-computed-type-label'],
	> div[data-widget="parameter-computed-type-icon"] {
		color : ${({valid}) => valid ? (void 0) : 'var(--danger-color)'};
	}
`;
export const ParameterComputeTypeLabel = styled.div.attrs({'data-widget': 'parameter-computed-type-label'})`
	font-variant : petite-caps;
	transition   : color 300ms ease-in-out;
	white-space  : nowrap;
`;
export const ParameterComputeTypeIcon = styled.div.attrs({'data-widget': 'parameter-computed-type-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	transition   : color 300ms ease-in-out;
	> svg {
		font-size : 0.8em;
	}
`;
