import styled from 'styled-components';

export const ParameterComputeTypeContainer = styled.div.attrs({'data-widget': 'parameter-computed-type'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : start;
	justify-self     : start;
	height           : var(--param-height);
	color            : var(--primary-color);
	background-color : var(--bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 2);
	margin-right     : calc(var(--margin) / 2);
	cursor           : pointer;
	outline          : none;
	box-shadow       : var(--param-border);
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
	&:before {
		content    : '';
		display    : block;
		position   : absolute;
		bottom     : calc(100% + 1px);
		left       : 50%;
		width      : 1px;
		height     : calc(var(--margin) / 4);
		box-shadow : var(--param-left-border);
		z-index    : -1;
	}
`;
export const ParameterComputeTypeLabel = styled.div.attrs({'data-widget': 'parameter-computed-type-label'})`
	font-variant : petite-caps;
`;
export const ParameterComputeTypeIcon = styled.div.attrs({'data-widget': 'parameter-computed-type-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
