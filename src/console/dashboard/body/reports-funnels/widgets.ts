import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import {DragType} from '@/widgets/report/types';
import styled from 'styled-components';

export type ReportsFunnelsRect = GraphicsPosition & GraphicsSize;

export const DashboardReportsFunnels = styled.div.attrs<{ rect: ReportsFunnelsRect }>(
	({rect: {x, y, width, height}}) => {
		return {
			'data-widget': 'dashboard-reports-funnels',
			style: {top: y, left: x, width: width === 0 ? (void 0) : width, height: height === 0 ? (void 0) : height}
		};
	})<{ rect: ReportsFunnelsRect }>`
	display          : flex;
	position         : absolute;
	flex-direction   : column;
	align-items      : center;
	max-width        : 600px;
	min-width        : 400px;
	padding          : 0 calc(var(--margin) / 2) calc(var(--margin) / 2);
	border-radius    : calc(var(--border-radius) * 2);
	background-color : var(--bg-color);
	box-shadow       : var(--shadow);
	transition       : width 300ms ease-in-out;
	overflow         : hidden;
	z-index          : 2;
	&:hover {
		box-shadow : var(--hover-shadow);
		> div[data-widget="chart-drag-handle"] {
			> div[data-position=${DragType.DND}]:not([data-part-type=dragging]) {
				opacity : 1;
			}
			> div[data-widget="chart-buttons"] {
				opacity : 1;
			}
		}
	}
`;
export const DashboardReportsFunnelsHeader = styled.div.attrs({'data-widget': 'dashboard-reports-funnels-header'})`
	display     : flex;
	position    : relative;
	height      : var(--height);
	align-items : center;
	width       : 100%;
`;
export const DashboardReportsFunnelsTitle = styled.div.attrs({'data-widget': 'dashboard-reports-funnels-title'})`
	display      : flex;
	position     : relative;
	flex-grow    : 1;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	font-size    : 1.1em;
	padding-left : calc(var(--margin) / 2);
	margin-top   : 6px;
	opacity      : 0.7;
`;
export const DashboardReportsFunnelsButton = styled.div.attrs({'data-widget': 'dashboard-reports-funnels-button'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : var(--height);
	width           : var(--height);
	margin-top      : 6px;
	margin-right    : -12px;
	border-radius   : calc(var(--border-radius) * 2);
	cursor          : pointer;
	transition      : box-shadow 300ms ease-in-out, color 300ms ease-in-out;
	z-index         : 2;
	&:hover {
		box-shadow : var(--primary-shadow);
		color      : var(--warn-color);
	}
	> svg {
		opacity : 0.5;
	}
	> span > svg {
		&:last-child {
			opacity : 0.5;
			color   : var(--font-color);
		}
		&:first-child {
			color : var(--danger-color);
		}
	}
`;
export const DashboardReportsFunnelEditors = styled.div.attrs({
	'data-widget': 'dashboard-reports-funnels-editors',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	flex-grow             : 1;
	grid-template-columns : auto 1fr;
	width                 : calc(100% + var(--margin) / 2);
	max-height            : 400px;
	margin-left           : calc(var(--margin) / -2);
	margin-top            : calc(var(--margin) / 4);
	overflow              : auto;
`;
export const FunnelName = styled.div.attrs({'data-widget': 'dashboard-report-funnel-name'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : calc(var(--height) * 1.4 + 1px);
	padding       : 0 calc(var(--margin) / 2);
	font-weight   : var(--font-demi-bold);
	font-variant  : petite-caps;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	opacity       : 0.5;
	transition    : opacity 300ms ease-in-out, color 300ms ease-in-out;
	cursor        : default;
	&:hover {
		opacity : 1;
		color   : var(--primary-color);
	}
`;
export const FunnelItemContainer = styled.div.attrs({'data-widget': 'dashboard-report-funnel-item'})`
	display     : flex;
	position    : relative;
	align-items : center;
	padding     : 0 calc(var(--margin) / 2);
`;
export const FunnelValues = styled.div.attrs({'data-widget': 'dashboard-report-funnel-values'})`

	display               : grid;
	align-items           : center;
	position              : relative;
	flex-grow             : 1;
	grid-template-columns : 100px auto 100px;
	margin-right          : 0;
	min-height            : calc(var(--height) * 1.4 + 1px);
	> input,
	> div[data-widget=dropdown],
	> div[data-widget=calendar],
	> div[data-widget=funnel-enum-values] {
		flex-grow  : 1;
		min-height : calc((var(--height) * 1.4 + 1px) * 0.8);
	}
	> div[data-widget=funnel-enum-values] {
		grid-column : 1 / span 3;
		margin-top  : calc(var(--height) * 0.2);
		> div[data-widget=funnel-enum-value] {
			min-height : calc((var(--height) * 1.4 + 1px) * 0.8);
		}
		+ div[data-widget=dropdown] {
			grid-column : 1 / span 3;
		}
	}
	> *:first-child:last-child {
		grid-column : 1 / span 3;
	}
`;
export const PairToLabel = styled.div.attrs({'data-widget': 'dashboard-report-funnel-pair-joint'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : calc(var(--height) * 1.4 + 1px);
	padding         : 0 calc(var(--margin) / 2);
	font-size       : 1.4em;
	font-family     : var(--title-font-family);
	font-weight     : var(--font-bold);
	font-variant    : petite-caps;
	white-space     : nowrap;
	overflow        : hidden;
	text-overflow   : ellipsis;
	opacity         : 0.7;
	transition      : opacity 300ms ease-in-out, color 300ms ease-in-out;
	cursor          : default;
	&:hover {
		opacity : 1;
		color   : var(--primary-color);
	}
`;
