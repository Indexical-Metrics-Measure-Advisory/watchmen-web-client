import styled from 'styled-components';

export const ReportBodyContainer = styled.div.attrs({
	'data-widget': 'connected-space-navigator-report'
})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	flex-grow             : 1;
	align-content         : start;
	padding               : calc(var(--margin) / 2);
	overflow-y            : auto;
`;
export const ReportTypeLabel = styled.div.attrs({'data-widget': 'connected-space-navigator-report-label'})`
	font-variant   : petite-caps;
	text-transform : capitalize;
`;