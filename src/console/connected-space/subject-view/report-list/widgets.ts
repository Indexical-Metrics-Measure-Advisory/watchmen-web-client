import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';

export const ReportListScroller = styled.div.attrs({'data-widget': 'report-list-scroller', 'data-v-scroll': ''})`
	display    : block;
	position   : relative;
	flex-grow  : 1;
	overflow-y : auto;
	overflow-x : hidden;
`;
export const ReportListContainer = styled.div.attrs({'data-widget': 'report-list'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(auto-fill, minmax(300px, 1fr));
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 2);
	align-items           : start;
	padding               : var(--margin) var(--margin) 0;
`;
export const ReportCard = styled.div.attrs({'data-widget': 'report-card'})`
	display        : flex;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin);
	position       : relative;
	border-radius  : calc(var(--border-radius) * 2);
	box-shadow     : var(--shadow);
	cursor         : pointer;
	transition     : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	&:last-child {
		margin-bottom : var(--margin);
	}
`;
export const ReportCardTitle = styled.div.attrs({'data-widget': 'report-card-title'})`
	display     : flex;
	align-items : center;
	font-family : var(--title-font-family);
	font-size   : 1.6em;
	> span {
		flex-grow : 1;
	}
`;
export const ReportCardDescription = styled.div.attrs({'data-widget': 'report-card-description'})`
	display     : flex;
	flex-grow   : 1;
	position    : relative;
	word-break  : break-word;
	font-size   : 0.9em;
	opacity     : 0.8;
	margin-top  : calc(var(--margin) / 2);
	min-height  : 3.5em;
	line-height : 1.5em;
`;
export const ReportCardStatistics = styled.div.attrs({'data-widget': 'report-card-statistics'})`
	display         : flex;
	justify-content : space-around;
	line-height     : 1.2em;
	opacity         : 0.7;
	margin          : calc(var(--margin) / 2) calc(var(--margin) / -2) 0;
`;
export const ReportCardStatisticsItem = styled(TooltipButton).attrs({'data-widget': 'report-card-statistics-item'})`
	font-size : 0.8em;
	svg {
		margin-right : calc(var(--margin) / 2);
	}
`;