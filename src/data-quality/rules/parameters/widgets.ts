import {Input} from '@/widgets/basic/input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const ParameterEditorContainer = styled.div.attrs({'data-widget': 'rule-parameter-editor'})`
	flex-grow   : 1;
	display     : flex;
	align-items : center;
	height      : var(--height);
	outline     : none;
	appearance  : none;
	transition  : all 300ms ease-in-out;
	cursor      : pointer;
`;
export const ParameterEditorLabel = styled.div.attrs({'data-widget': 'rule-parameter-editor-label'})`
	flex-grow   : 1;
	display     : flex;
	align-items : center;
`;
export const ParameterEditorIcon = styled(FontAwesomeIcon)`
	width       : 24px;
	margin-left : calc(var(--margin) / 2);
	font-size   : 0.9em;
	opacity     : 0.7;
`;
export const ParameterPositionLabel = styled.div.attrs({'data-widget': 'rule-parameter-position-label'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-size    : 1.2em;
	font-variant : petite-caps;
	font-weight  : var(--font-semi-bold);
	height       : calc(var(--height) * 1.1);
`;
export const ParameterEditor = styled.div.attrs({'data-widget': 'rule-parameter-editor'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-column-gap       : var(--margin);
	grid-auto-rows        : var(--height);
	grid-row-gap          : calc(var(--margin) / 4);
	width                 : 100%;
	margin-top            : calc(var(--margin) / 2);
	margin-bottom         : calc(var(--margin) / 2);
`;
export const ParameterEditorDropdownLabel = styled.div`
	display        : flex;
	align-items    : center;
	height         : var(--height);
	text-transform : capitalize;
`;
export const ParameterDialogHeader = styled.div`
	display        : flex;
	position       : relative;
	padding        : 0 var(--margin);
	min-height     : calc(var(--header-height) * 1.2);
	margin         : calc(var(--margin) * -1) calc(var(--margin) * -1) 0;
	align-items    : center;
	font-variant   : petite-caps;
	font-size      : 1.6em;
	font-weight    : var(--font-bold);
	text-transform : capitalize;
`;
export const ParameterEditorDropdownEditor = styled.div`
	display     : flex;
	align-items : center;
	height      : var(--height);
`;

export const PercentageContainer = styled.div`
	display       : flex;
	position      : relative;
	align-items   : center;
	border        : var(--border);
	border-radius : var(--border-radius);
	height        : var(--height);
	width         : 100%;
	> input {
		border        : 0;
		flex-grow     : 1;
		padding-right : 30px;
	}
	> svg.svg-inline--fa {
		display   : block;
		position  : absolute;
		right     : 0;
		font-size : 0.9em;
		width     : 24px;
	}
`;
export const NumberInput = styled(Input)`
	width : 100%;
`;