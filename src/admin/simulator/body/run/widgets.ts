import styled from 'styled-components';
import {Button} from '../../../../basic-widgets/button';

const COLUMNS = '400px repeat(4, 140px)';
const COLUMNS_WIDTH = '960px';
export const RunTable = styled.div.attrs({'data-widget': 'run-table'})`
	position: relative;
	display: flex;
	flex-direction: column;
`;
export const RunTableHeader = styled.div.attrs({'data-widget': 'run-table-header'})`
	display: grid;
	position: sticky;
	grid-template-columns: ${COLUMNS};
	top: 0;
	min-width: ${COLUMNS_WIDTH};
	border-bottom: var(--border);
	z-index: 1;
`;
export const RunTableHeaderCell = styled.div.attrs({'data-widget': 'run-table-header-cell'})`
	display: flex;
	align-items: center;
	padding: 0 calc(var(--margin) / 8);
	margin-bottom: -1px;
	height: var(--tall-height);
	font-weight: var(--font-bold);
	font-size: 1.2em;
	border-bottom: var(--border);
	background-color: var(--bg-color);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const RunTableBodyRow = styled.div.attrs({'data-widget': 'run-table-body-row'})`
	display: grid;
	position: relative;
	grid-template-columns: ${COLUMNS};
	min-width: ${COLUMNS_WIDTH};
	border-bottom: var(--border);
`;
export const RunTableBodyCell = styled.div.attrs({'data-widget': 'run-table-body-cell'})`
	display: flex;
	align-items: center;
	padding: 0 calc(var(--margin) / 8);
	margin-bottom: -1px;
	height: var(--tall-height);
	border-bottom: var(--border);
	background-color: var(--bg-color);
	&:first-child,
	&:nth-child(2) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;
export const ElementType = styled.span`
	display: inline-flex;
	position: relative;
	align-items: center;
	justify-content: center;
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	width: 20px;
	height: 20px;
	border-radius: calc(var(--border-radius) * 2);
	border-style: solid;
	border-width: calc(var(--border-width) * 2);
	margin-right: 4px;
`;
export const PipelineElementType = styled(ElementType)`
	color: var(--info-color);
	border-color: var(--info-color);
`;
export const StageElementType = styled(ElementType)`
	color: var(--warn-color);
	border-color: var(--warn-color);
`;
export const UnitElementType = styled(ElementType)`
	color: var(--primary-color);
	border-color: var(--primary-color);
`;
export const ActionElementType = styled(ElementType)`
	color: var(--danger-color);
	border-color: var(--danger-color);
`;
export const CellButton = styled(Button)`
	height: 20px;
	font-size: 0.8em;
`;
