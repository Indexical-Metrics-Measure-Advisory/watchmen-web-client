import styled from 'styled-components';

export const JointOperatorsContainer = styled.div.attrs({'data-widget': 'joint-operators'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	align-self    : center;
	justify-self  : start;
	font-variant  : petite-caps;
	height        : var(--param-height);
	margin-left   : var(--margin);
	border-radius : calc(var(--param-height) / 2);
	cursor        : pointer;
	outline       : none;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		bottom                    : 50%;
		left                      : calc(var(--margin) / -2);
		width                     : calc(var(--margin) / 2);
		height                    : calc(100% + 2px);
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
`;
export const JointOperator = styled.div.attrs({'data-widget': 'joint-operator'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : var(--param-height);
	padding     : 0 calc(var(--margin) / 2);
	opacity     : 0.7;
	transition  : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	&:first-child {
		box-shadow                : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
		border-top-left-radius    : calc(var(--param-height) / 2);
		border-bottom-left-radius : calc(var(--param-height) / 2);
	}
	&:not(:first-child) {
		box-shadow                 : var(--param-border);
		border-top-right-radius    : calc(var(--param-height) / 2);
		border-bottom-right-radius : calc(var(--param-height) / 2);
	}
	&:hover {
		z-index    : 1;
		color      : var(--warn-color);
		box-shadow : var(--primary-hover-shadow);
		opacity    : 1;
		+ div[data-widget="joint-operator"] {
			box-shadow : var(--param-top-border), var(--param-right-border), var(--param-bottom-border);
		}
	}
	> svg {
		font-size    : 0.8em;
		margin-right : calc(var(--margin) / 4);
		opacity      : 0.7;
	}
`;
