import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const EditorContainer = styled.div.attrs<{ editable: boolean }>(({editable}) => {
	return {
		'data-widget': 'report-editor',
		style: {
			gridTemplateColumns: editable ? (void 0) : '1fr'
		}
	};
})<{ editable: boolean }>`
	display               : grid;
	position              : sticky;
	top                   : 0;
	width                 : 100%;
	max-height            : calc(100vh - var(--page-header-height));
	grid-template-columns : auto 1fr;
	grid-template-rows    : 1fr auto;
	background-color      : var(--bg-color);
	overflow              : hidden;
	@media print {
		grid-template-columns : 1fr;
	}
`;
export const ChartContainer = styled.div.attrs({'data-widget': 'report-chart-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-template-rows    : 1fr;
`;
export const ReportPartButton = styled(Button)`
	position      : absolute;
	height        : calc(var(--margin) * 1.5);
	width         : calc(var(--margin) * 1.5);
	top           : 0;
	margin-top    : calc(var(--margin) / 2);
	border-radius : 0;
	font-size     : 1.5em;
	z-index       : 2;
	opacity       : 0.2;
	transition    : all 300ms ease-in-out, border-radius 0ms;
	&:hover {
		opacity : 1;
	}
	&:first-child {
		left          : 0;
		margin-left   : calc(var(--margin) / 2);
		border-radius : 25% 0 0 25%;
	}
	&:nth-child(2) {
		margin-left : 0;
		left        : calc(var(--margin) * 2);
	}
	&:nth-child(3) {
		margin-left : 0;
		left        : calc(var(--margin) * 3.5);
	}
	&:nth-child(4) {
		margin-left : 0;
		left        : calc(var(--margin) * 5);
	}
	&:nth-child(5) {
		margin-left : 0;
		left        : calc(var(--margin) * 6.5);
	}
	&:nth-last-child(2) {
		border-radius : 0 25% 25% 0;
	}
	@media print {
		display : none;
	}
`;
