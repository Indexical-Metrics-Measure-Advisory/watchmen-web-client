import styled from 'styled-components';
import {TooltipButton} from '../../../../basic-widgets/tooltip-button';

export const SubjectReportsWorkbench = styled.div.attrs({'data-widget': 'reports-workbench'})`
	display: flex;
	flex-grow: 1;
	position: relative;
`;
export const SubjectReportsSideBar = styled.div.attrs({'data-widget': 'reports-workbench-sidebar'})`
	display: flex;
	flex-direction: column;
	position: relative;
	border-right: var(--border);
	min-width: 300px;
`;
export const SubjectReportsSelector = styled.div.attrs({'data-widget': 'reports-workbench-selector'})`
	display: flex;
	flex-direction: column;
	position: relative;
`;
export const SubjectSelectReport = styled.div.attrs({'data-widget': 'reports-workbench-selected'})`
	display: grid;
	position: relative;
	grid-template-columns: 1fr auto auto;
	align-items: center;
	padding: 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	font-family: var(--title-font-family);
	font-size: 1.4em;
	height: 2.4em;
	border-bottom: var(--border);
`;
export const NavigatorHeaderButton = styled(TooltipButton).attrs({'data-widget': 'reports-workbench-navigator-header-button'})`
	padding: 0;
	width: var(--height);
	height: var(--height);
`;
export const SubjectReportList = styled.div.attrs<{ visible: boolean, count: number }>(({visible, count}) => {
	return {
		'data-widget': 'reports-workbench-report-list',
		'data-v-scroll': '',
		style: {
			maxHeight: visible ? `calc(var(--grid-row-height) * ${Math.min(5, count)} + var(--grid-row-height) / 2)` : 0,
			borderBottom: visible ? 'var(--border)' : (void 0)
		}
	};
})<{ visible: boolean, count: number }>`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;
export const ReportCandidate = styled.div.attrs({'data-widget': 'reports-workbench-candidate'})`
	display: flex;
	align-items: center;
	min-height: var(--grid-row-height);
	padding: 0 calc(var(--margin) / 2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border-bottom: var(--border);
	cursor: pointer;
	transition: background-color 300ms ease-in-out;
	&:hover {
		background-color: var(--hover-color);
	}
	&:last-child {
		border-bottom-color: transparent;
	}
`;

export const SubjectReportContainer = styled.div.attrs({
	'data-widget': 'reports',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	flex-grow: 1;
	display: block;
	position: relative;
	overflow: auto;
	@media print {
		overflow: unset;
	}
`;
export const SubjectNoReport = styled.div.attrs({'data-widget': 'reports-no-reports'})`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-family: var(--title-font-family);
	font-size: 2em;
	opacity: 0.7;
	> span {
		margin-top: -10%;
	}
`;
