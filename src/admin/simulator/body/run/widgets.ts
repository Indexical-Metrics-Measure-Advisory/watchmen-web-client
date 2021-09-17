import {Button} from '@/widgets/basic/button';
import {ButtonInk} from '@/widgets/basic/types';
import styled from 'styled-components';
import {SimulatorBodyPartBody} from '../widgets';

const COLUMNS = '400px repeat(2, 100px) 600px';
const COLUMNS_WIDTH = '1200px';
export const RunBody = styled(SimulatorBodyPartBody)`
	padding-top : 0;
`;
export const RunTable = styled.div.attrs({'data-widget': 'run-table'})`
	position       : relative;
	display        : flex;
	flex-direction : column;
`;
export const RunTableHeader = styled.div.attrs({'data-widget': 'run-table-header'})`
	display               : grid;
	position              : sticky;
	align-items           : end;
	grid-template-columns : ${COLUMNS};
	top                   : 0;
	min-width             : ${COLUMNS_WIDTH};
	width                 : 100%;
	border-bottom         : var(--border);
	border-bottom-width   : calc(var(--border-width) * 2);
	border-bottom-color   : var(--info-color);
	background-color      : var(--bg-color);
	z-index               : 1;
`;
export const RunTableHeaderCell = styled.div.attrs({'data-widget': 'run-table-header-cell'})`
	display          : flex;
	align-items      : center;
	padding          : 0 calc(var(--margin) / 8);
	height           : var(--tall-height);
	font-variant     : petite-caps;
	font-family      : var(--title-font-family);
	font-size        : 1.2em;
	background-color : var(--bg-color);
	overflow         : hidden;
	white-space      : nowrap;
	text-overflow    : ellipsis;
`;

export const RunTableBodyRow = styled.div.attrs({'data-widget': 'run-table-body-row'})`
	display               : grid;
	position              : relative;
	grid-template-columns : ${COLUMNS};
	min-width             : ${COLUMNS_WIDTH};
	&:not(:first-child) {
		border-top : var(--border);
	}
`;
export const RunTablePipelineRow = styled(RunTableBodyRow)`
	background-color : var(--border-color);
	&:not(:first-child) {
		border-top       : var(--border);
		border-top-color : var(--info-color);
	}
`;
export const RunTableBodyCell = styled.div.attrs({'data-widget': 'run-table-body-cell'})`
	display       : flex;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 8);
	margin-bottom : -1px;
	height        : var(--tall-height);
	white-space   : nowrap;
	&:first-child {
		overflow      : hidden;
		white-space   : nowrap;
		text-overflow : ellipsis;
	}
`;
export const ElementType = styled.span`
	display         : inline-flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	font-variant    : petite-caps;
	font-weight     : var(--font-bold);
	width           : 20px;
	height          : 20px;
	border-radius   : calc(var(--border-radius) * 2);
	border-style    : solid;
	border-width    : calc(var(--border-width) * 2);
	margin-right    : 4px;
`;
export const PipelineElementType = styled(ElementType)`
	color        : var(--info-color);
	border-color : var(--info-color);
`;
export const StageElementType = styled(ElementType)`
	color        : var(--warn-color);
	border-color : var(--warn-color);
`;
export const UnitElementType = styled(ElementType)`
	color        : var(--primary-color);
	border-color : var(--primary-color);
`;
export const ActionElementType = styled(ElementType)`
	color        : var(--danger-color);
	border-color : var(--danger-color);
`;
export const CellButton = styled(Button)`
	height        : 20px;
	font-size     : 0.8em;
	border-radius : 10px;
`;
export const StatusLabel = styled.span.attrs<{ ink?: ButtonInk }>(({ink}) => {
	let color = '';
	switch (ink) {
		case ButtonInk.PRIMARY:
			color = 'var(--primary-color)';
			break;
		case ButtonInk.DANGER:
			color = 'var(--danger-color)';
			break;
		case ButtonInk.INFO:
			color = 'var(--info-color)';
			break;
		case ButtonInk.WARN:
			color = 'var(--warn-color)';
			break;
		case ButtonInk.SUCCESS:
			color = 'var(--success-color)';
			break;
	}
	return {style: {color}};
})<{ ink?: ButtonInk }>`
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
