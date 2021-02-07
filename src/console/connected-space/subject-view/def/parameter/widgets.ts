import styled from 'styled-components';
import { Dropdown } from '../../../../../basic-widgets/dropdown';
import { Input } from '../../../../../basic-widgets/input';
import { ComputedEdit } from './computed-edit';
import { ConstantEdit } from './constant-edit';
import { ParameterTypeEdit } from './parameter-type-edit';
import { TopicFactorEdit } from './topic-factor-edit';

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
	box-shadow       : var(--param-primary-border);
	&:hover {
		box-shadow : var(--param-primary-border), var(--primary-hover-shadow);
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
export const TopicFactorEditContainer = styled.div.attrs({ 'data-widget': 'parameter-topic-factor-edit' })`
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
	box-shadow                 : var(--param-primary-top-border), var(--param-primary-left-border), var(--param-primary-bottom-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--param-primary-border), var(--primary-hover-shadow);
		> svg {
			color : var(--primary-color);
		}
		> div {
			border     : 0;
			box-shadow : var(--param-primary-border);
		}
	}
`;
export const FactorDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-primary-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--param-primary-border), var(--primary-hover-shadow);
		> svg {
			color : var(--primary-color);
		}
		> div {
			border     : 0;
			box-shadow : var(--param-primary-border);
		}
	}
`;
export const IncorrectOptionLabel = styled.span.attrs({ 'data-widget': 'incorrect-option' })`
	color           : var(--danger-color);
	text-decoration : line-through;
`;

export const ComputedEditContainer = styled.div.attrs({ 'data-widget': 'parameter-computed-edit' })`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	align-self            : stretch;
	align-items           : center;
	min-height            : var(--param-height);
`;
export const ParameterCalculatorTypeContainer = styled.div.attrs({ 'data-widget': 'parameter-computed-type' })`
	display                   : flex;
	position                  : relative;
	align-items               : center;
	align-self                : stretch;
	justify-self              : start;
	height                    : 100%;
	color                     : var(--primary-color);
	border-top-left-radius    : calc(var(--param-height) / 2);
	border-bottom-left-radius : calc(var(--param-height) / 2);
	padding                   : 0 calc(var(--margin) / 2);
	cursor                    : pointer;
	outline                   : none;
	box-shadow                : var(--param-primary-border);
	&:hover {
		z-index    : 1;
		box-shadow : var(--param-primary-border), var(--primary-hover-shadow);
	}
`;
export const ParameterCalculatorTypeLabel = styled.div.attrs({ 'data-widget': 'parameter-computed-type-label' })`
	font-variant : petite-caps;
`;
export const ParameterCalculatorTypeIcon = styled.div.attrs({ 'data-widget': 'parameter-computed-type-icon' })`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
export const ComputedEditBody = styled.div.attrs({ 'data-widget': 'parameter-computed-body' })`
	display                    : grid;
	position                   : relative;
	grid-template-columns      : 1fr;
	grid-row-gap               : calc(var(--margin) / 4);
	align-self                 : stretch;
	justify-self               : stretch;
	min-height                 : var(--param-height);
	box-shadow                 : var(--param-primary-top-border), var(--param-primary-right-border), var(--param-primary-bottom-border);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	padding-left               : 1px;
`;
export const ParameterContainer = styled.div.attrs<{ shorten: boolean }>(({ shorten }) => {
	return {
		'data-widget': 'subject-def-column-edit-wrapper',
		style: {
			gridTemplateColumns: shorten ? 'auto auto auto 1fr' : (void 0)
		}
	};
})<{ shorten: boolean }>`
	display               : grid;
	grid-template-columns : auto 1fr auto auto;
	grid-row-gap          : calc(var(--margin) / 4);
	position              : relative;
	align-self            : stretch;
	justify-self          : stretch;
	> div[data-widget="parameter-type-edit"] {
		border-radius    : 0;
	}
`;

export const ParameterTypeEditor = styled(ParameterTypeEdit)`
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	& + div[data-widget="subject-def-column-alias-edit"]:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--bg-color);
		opacity          : 0.5;
	}
`;
export const ConstantValueEditor = styled(ConstantEdit)`
	border-left   : 0;
	border-right  : 0;
	border-radius : 0;
`;
export const TopicFactorEditor = styled(TopicFactorEdit)`
	> div[data-widget=dropdown] {
		&:first-child {
			border-radius : 0;
			box-shadow    : var(--param-primary-top-border), var(--param-primary-bottom-border);
		}
		&:last-child {
			border-radius : 0;
			box-shadow    : var(--param-primary-top-border), var(--param-primary-left-border), var(--param-primary-bottom-border);
		}
		&:hover,
		&:focus {
			z-index    : 1;
			box-shadow : var(--param-primary-border), var(--primary-hover-shadow);
			> svg {
				color : var(--primary-color);
			}
			> div {
				border     : 0;
				box-shadow : var(--param-primary-border);
			}
		}
	}
`;
export const DeleteMeButton = styled.div.attrs({ 'data-widget': 'delete-me-button' })`
	display                    : flex;
	position                   : relative;
	align-self                 : stretch;
	align-items                : center;
	height                     : var(--param-height);
	padding                    : 0 calc(var(--margin) / 4);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	background-color           : var(--danger-color);
	color                      : var(--invert-color);
	box-shadow                 : var(--param-danger-border);
	cursor                     : pointer;
	&:hover {
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const ComputedEditor = styled(ComputedEdit)`
	grid-column  : span 4;
	padding-left : var(--margin);
`;