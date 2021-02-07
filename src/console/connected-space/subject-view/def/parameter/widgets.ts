import styled from 'styled-components';

export const ParameterTypeEditContainer = styled.div.attrs({ 'data-widget': 'parameter-type-edit' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	height           : var(--button-height-in-form);
	background-color : var(--primary-color);
	color            : var(--invert-color);
	border           : var(--border);
	border-color     : var(--primary-color);
	border-radius    : calc(var(--button-height-in-form) / 2);
	padding          : 0 calc(var(--margin) / 4);
	cursor           : pointer;
	outline          : none;
`;
export const ParameterTypeFromLabel = styled.div.attrs({ 'data-widget': 'parameter-type-edit-from-label' })`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	font-variant : petite-caps;
	padding      : 0 calc(var(--margin) / 4);
	z-index      : 1;
`;
export const ParameterTypeLabel = styled.div.attrs<{ active: boolean, edit: boolean }>(({ active, edit }) => {
	return {
		'data-widget': 'parameter-type-edit-label',
		style: {
			backgroundColor: active ? (void 0) : 'var(--bg-color)',
			color: active ? (void 0) : 'var(--font-color)',
			width: (!active && !edit) ? 0 : (void 0),
			padding: (!active && !edit) ? 0 : (void 0)
		}
	};
})<{ active: boolean, edit: boolean }>`
	display            : flex;
	position           : relative;
	align-self         : stretch;
	align-items        : center;
	font-variant       : petite-caps;
	padding            : 0 calc(var(--margin) / 4);
	white-space        : nowrap;
	overflow           : hidden;
	text-overflow      : clip;
	transition         : all 300ms ease-in-out;
	border-right       : var(--border);
	border-right-color : var(--primary-color);
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const ParameterTypeIcon = styled.div.attrs({ 'data-widget': 'parameter-type-edit-icon' })`
	display     : flex;
	position    : relative;
	align-self  : stretch;
	align-items : center;
	padding     : 0 calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;