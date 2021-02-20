import styled from 'styled-components';
import { BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR } from '../../../../../admin/pipelines/pipeline/header/widgets';

export const EditorContainer = styled.div.attrs({ 'data-widget': 'report-editor' })`
	display               : grid;
	position              : sticky;
	top                   : 0;
	width                 : 100%;
	max-height            : ${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR};
	grid-template-columns : 1fr auto;
	background-color      : var(--bg-color);
	overflow              : hidden;
`;
