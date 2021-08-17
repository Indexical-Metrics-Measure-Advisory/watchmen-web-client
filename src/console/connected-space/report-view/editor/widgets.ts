import styled from 'styled-components';
import {BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} from '../../../../admin/pipelines/pipeline/header/widgets';

export const EditorContainer = styled.div.attrs<{ datasetVisible: boolean, editable: boolean }>(
	({datasetVisible, editable}) => {
		return {
			'data-widget': 'report-editor',
			style: {
				gridTemplateRows: datasetVisible ? '1fr 300px' : '1fr',
				gridTemplateColumns: editable ? (void 0) : '1fr'
			}
		};
	})<{ datasetVisible: boolean, editable: boolean }>`
	display: grid;
	position: sticky;
	top: 0;
	width: 100%;
	max-height: ${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR};
	grid-template-columns: auto 1fr;
	background-color: var(--bg-color);
	overflow: hidden;
	@media print {
		grid-template-columns: 1fr;
	}
`;
