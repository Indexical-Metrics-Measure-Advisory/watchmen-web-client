import styled from 'styled-components';
import { Input } from '../../../../../basic-widgets/input';
import { ConstantEdit } from '../parameter/constant-edit';
import { ParameterTypeEdit } from '../parameter/parameter-type-edit';
import { TopicFactorEdit } from '../parameter/topic-factor-edit';

export const ColumnsContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-columns',
		'data-v-scroll': '',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	overflow-y     : auto;
	overflow-x     : hidden;
	border-right   : var(--border);
`;
export const ColumnsEditContainer = styled.div.attrs<{ visible: boolean }>(({ visible }) => {
	return {
		'data-widget': 'subject-def-columns-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin) 0 0;
`;
export const ColumnsBottomGap = styled.div.attrs({ 'data-widget': 'subject-def-columns-bottom-gap' })`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const ColumnEditContainer = styled.div.attrs({ 'data-widget': 'subject-def-column-edit' })`
	display               : grid;
	grid-template-columns : var(--margin) 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding-bottom        : calc(var(--margin) / 4);
`;
export const ColumnIndex = styled.span.attrs({ 'data-widget': 'subject-def-column-index' })`
	justify-self : end;
	line-height  : var(--param-height);
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
export const ColumnEditWrapper = styled.div.attrs({ 'data-widget': 'subject-def-column-edit-wrapper' })`
	display               : grid;
	grid-template-columns : auto 1fr auto auto;
	position              : relative;
	align-self            : stretch;
	justify-self          : stretch;
	> div[data-widget="parameter-type-edit"] {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
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
	> div[data-widget=dropdown]:first-child {
		border-radius : 0;
		box-shadow    : var(--param-top-border), var(--param-bottom-border);
		&:hover {
			box-shadow : var(--primary-hover-shadow);
		}
	}
	> div[data-widget=dropdown]:last-child {
		border-radius : 0;
		box-shadow    : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
		&:hover {
			box-shadow : var(--primary-hover-shadow);
		}
	}
`;
export const AliasEdit = styled.div.attrs({ 'data-widget': 'subject-def-column-alias-edit' })`
	display      : flex;
	position     : relative;
	align-items  : center;
	align-self   : stretch;
	justify-self : stretch;
	height       : var(--param-height);
`;
export const AliasLabel = styled.div.attrs({ 'data-widget': 'subject-def-column-alias-edit-label' })`
	display          : flex;
	align-items      : center;
	align-self       : stretch;
	justify-self     : stretch;
	background-color : var(--primary-color);
	color            : var(--invert-color);
	padding          : 0 calc(var(--margin) / 4);
	box-shadow       : var(--param-primary-top-border), var(--param-primary-bottom-border);
`;
export const AliasEditInput = styled(Input).attrs({ 'data-widget': 'subject-def-column-alias-edit-input' })`
	width         : 200px;
	height        : var(--param-height);
	border        : 0;
	border-radius : 0;
	box-shadow    : var(--param-top-border), var(--param-bottom-border);
	&:hover {
		z-index      : 1;
		border-color : transparent;
		box-shadow   : var(--primary-hover-shadow);
	}
`;
export const DeleteColumnButton = styled.div.attrs({'data-widget': 'subject-def-column-delete'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	height       : var(--param-height);
	padding : 0 calc(var(--margin) / 4);
	border-top-right-radius: calc(var(--param-height) / 2);
	border-bottom-right-radius: calc(var(--param-height) / 2);
	background-color: var(--danger-color);
	color: var(--invert-color);
	box-shadow: var(--param-danger-border);
	cursor: pointer;
	&:hover {
		box-shadow: var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`