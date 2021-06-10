import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ParameterEditorContainer = styled.div.attrs({'data-widget': 'rule-parameter-editor'})`
	flex-grow: 1;
	display: flex;
	align-items: center;
	height: var(--height);
	outline: none;
	appearance: none;
	transition: all 300ms ease-in-out;
	cursor: pointer;
`;
export const ParameterEditorLabel = styled.div.attrs({'data-widget': 'rule-parameter-editor-label'})`
	flex-grow: 1;
	display: flex;
	align-items: center;
`;
export const ParameterEditorIcon = styled(FontAwesomeIcon)`
	width: 24px;
	margin-left: calc(var(--margin) / 2);
	font-size: 0.9em;
	transition: opacity 300ms ease-in-out, color 300ms ease-in-out;
`;
export const ParameterEditor = styled.div.attrs({'data-widget': 'rule-parameter-editor'})`
	display: grid;
	position: relative;
	grid-template-columns: auto 1fr;
	grid-column-gap: var(--margin);
	grid-auto-rows: var(--height);
	grid-row-gap: calc(var(--margin) / 8);
	width: 100%;
`;
export const ParameterEditorDropdownLabel = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	text-transform: capitalize;
`;
export const ParameterEditorDropdownEditor = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
`;