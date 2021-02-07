import styled from 'styled-components';
import { Dropdown } from '../../../../../basic-widgets/dropdown';
import { Input } from '../../../../../basic-widgets/input';

export const ParameterTypeEditContainer = styled.div.attrs({ 'data-widget': 'parameter-type-edit' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	height           : var(--param-height);
	background-color : var(--primary-color);
	color            : var(--invert-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 4);
	cursor           : pointer;
	outline          : none;
	box-shadow: var(--param-primary-border);
	&:hover {
		box-shadow: var(--param-primary-border), var(--primary-hover-shadow);
	}
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
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
export const ConstantInput = styled(Input).attrs({ 'data-widget': 'parameter-constant-value' })`
	height : var(--param-height);
	&:hover {
		z-index      : 1;
		border-color : transparent;
		box-shadow   : var(--primary-hover-shadow);
	}
`;
export const TopicFactorEditContainer = styled.div.attrs({ 'data-widget': 'parameter-topic-factor-value' })`
	display               : grid;
	grid-template-columns : 50% 50%;
	position              : relative;
	align-self            : stretch;
	align-items           : center;
	height                : var(--param-height);
`;
export const TopicDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const FactorDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-border);
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const IncorrectOptionLabel = styled.span.attrs({'data-widget': 'incorrect-option'})`
	color: var(--danger-color);
	text-decoration : line-through;
`