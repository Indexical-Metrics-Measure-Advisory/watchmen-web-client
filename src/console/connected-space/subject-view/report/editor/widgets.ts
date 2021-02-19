import styled from 'styled-components';
import { ReportRect } from '../../../../../services/tuples/report-types';

export const EditorContainer = styled.div.attrs({ 'data-widget': 'report-editor' })`
	display               : grid;
	position              : sticky;
	top                   : 0;
	width                 : 100%;
	height                : 100%;
	grid-template-columns : 1fr 400px;
	background-color      : var(--bg-color);
`;
