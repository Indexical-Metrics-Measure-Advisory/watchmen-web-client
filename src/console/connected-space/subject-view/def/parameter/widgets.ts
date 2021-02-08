import styled from 'styled-components';

export const DeleteMeButton = styled.div.attrs({ 'data-widget': 'delete-me-button' })`
	display                    : flex;
	position                   : relative;
	align-self                 : stretch;
	align-items                : center;
	height                     : var(--param-height);
	padding                    : 0 calc(var(--margin) / 4);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	color                      : var(--param-bg-color);
	box-shadow                 : var(--param-border);
	cursor                     : pointer;
	transition                 : color 300ms ease-in-out, box-shadow 300ms ease-in-out;
	&:hover {
		color      : var(--danger-color);
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;
