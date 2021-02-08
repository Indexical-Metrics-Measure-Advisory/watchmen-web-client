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
export const ParameterTypeFromLabel = styled.div.attrs({ 'data-widget': 'parameter-type-edit-from-label' })`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
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
	display       : flex;
	position      : relative;
	align-self    : stretch;
	align-items   : center;
	font-variant  : petite-caps;
	padding       : 0 calc(var(--margin) / 4);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : clip;
	transition    : all 300ms ease-in-out;
	box-shadow    : var(--param-left-border);
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
	height     : var(--param-height);
	border     : 0;
	box-shadow : var(--param-border);
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
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
	box-shadow                 : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div {
			border     : 0;
			box-shadow : var(--param-border);
		}
	}
`;
export const FactorDropdown = styled(Dropdown)`
	height                     : var(--param-height);
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	border                     : 0;
	background-color           : var(--bg-color);
	box-shadow                 : var(--param-border);
	&:hover,
	&:focus {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div {
			border     : 0;
			box-shadow : var(--param-border);
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
export const ParameterComputeTypeContainer = styled.div.attrs({ 'data-widget': 'parameter-computed-type' })`
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
export const ParameterComputeTypeLabel = styled.div.attrs({ 'data-widget': 'parameter-computed-type-label' })`
	font-variant : petite-caps;
`;
export const ParameterComputeTypeIcon = styled.div.attrs({ 'data-widget': 'parameter-computed-type-icon' })`
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
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	padding-left               : 1px;
`;
export const ParameterContainer = styled.div.attrs<{ shorten: boolean }>(({ shorten }) => {
	return {
		'data-widget': 'parameters',
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
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height));
		z-index                   : -1;
		border-bottom-left-radius : 2px;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:first-child:before {
		top           : calc(var(--param-height) / 2 - 1px);
		border-radius : 0;
		width         : calc(var(--margin) / 2);
		height        : 1px;
	}
	&:not(:last-child):after {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--param-height) / 2);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
	> div[data-widget="parameter-type-edit"] {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
`;
