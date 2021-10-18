import styled from 'styled-components';

export const DashboardReportsFunnels = styled.div.attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'dashboard-reports-funnels',
			style: {
				width: expanded ? '100%' : 'calc(var(--margin) * 2)',
				maxWidth: expanded ? '100%' : 'calc(var(--margin) * 2)',
				borderBottom: expanded ? 'var(--border)' : (void 0),
				backgroundColor: expanded ? 'var(--bg-color)' : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	display     : flex;
	position    : absolute;
	align-items : center;
	top         : 0;
	left        : 0;
	min-height  : calc(var(--margin) * 1.5);
	z-index     : 2;
	padding     : calc(var(--margin) / 4) calc(var(--margin) / 2);
	transition  : width 300ms ease-in-out;
	overflow-x  : hidden;
`;
export const DashboardReportsFunnelsButton = styled.div.attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'dashboard-reports-funnels-button',
			style: {}
		};
	})<{ expanded: boolean }>`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : calc(var(--margin) / 4);
	right           : calc(var(--margin) / 2);
	height          : var(--margin);
	width           : var(--margin);
	color           : var(--primary-color);
	border-radius   : 100%;
	box-shadow      : var(--primary-shadow);
	cursor          : pointer;
	transition      : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
		> svg {
			opacity : 1;
		}
	}
	> svg {
		opacity    : 0.5;
		transition : opacity 300ms ease-in-out;
	}
`;
export const DashboardReportsFunnelEditors = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		'data-widget': 'dashboard-reports-funnels-editors',
		style: {
			display: expanded ? (void 0) : 'none'
		}
	};
})<{ expanded: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(3, 1fr);
`;