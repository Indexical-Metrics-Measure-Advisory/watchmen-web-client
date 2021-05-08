import styled from 'styled-components';
import {GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP} from '../constants';

export const PipelinePartContainer = styled.div.attrs({'data-widget': 'pipeline-part'})`
	display               : grid;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;
export const TopicName = styled.div.attrs({'data-widget': 'pipeline-topic-name'})`
	display          : flex;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	font-variant     : petite-caps;
	font-weight      : var(--font-demi-bold);
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	background-color : var(--param-bg-color);
	border-radius    : calc(var(--param-height) / 2);
	border           : var(--param-border);
	cursor           : default;
`;
