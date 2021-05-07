import styled from 'styled-components';

export const JointFoldContainer = styled.div.attrs({'data-widget': 'joint-fold'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	align-self    : center;
	justify-self  : start;
	font-variant  : petite-caps;
	height        : var(--param-height);
	margin-left   : calc(var(--margin) / 2);
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
		height                    : 1px;
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
`;
export const JointFoldOperator = styled.div.attrs({'data-widget': 'joint-fold-operator'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	border-radius : calc(var(--param-height) / 2);
	box-shadow    : var(--param-border);
	opacity       : 0.7;
	transition    : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
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
