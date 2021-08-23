import styled from 'styled-components';

export const ParameterFromEditContainer = styled.div.attrs({'data-widget': 'parameter-from-edit'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	height           : var(--param-height);
	background-color : var(--param-bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 4);
	cursor           : pointer;
	outline          : none;
	box-shadow       : var(--param-border);
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--param-border), var(--primary-hover-shadow);
	}
`;
export const ParameterFromLabel = styled.div.attrs({'data-widget': 'parameter-from-label'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
	padding      : 0 calc(var(--margin) / 4);
`;
export const ParameterTypeButton = styled.div.attrs<{ active: boolean, edit: boolean }>(({active, edit}) => {
	return {
		'data-widget': 'parameter-from-button',
		style: {
			backgroundColor: active ? (void 0) : 'var(--bg-color)',
			color: active ? (void 0) : 'var(--font-color)',
			width: (!active && !edit) ? 0 : (void 0),
			padding: (!active && !edit) ? 0 : (void 0)
		}
	};
})<{ active: boolean, edit: boolean }>`
	display       : flex;
	position      : relative;
	align-self    : stretch;
	align-items   : center;
	font-variant  : petite-caps;
	padding       : 0 calc(var(--margin) / 4);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : clip;
	box-shadow    : var(--param-left-border);
	&:hover {
		z-index    : 1;
		box-shadow : var(--param-border), var(--primary-hover-shadow);
	}
`;
export const ParameterFromIcon = styled.div.attrs({'data-widget': 'parameter-from-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
