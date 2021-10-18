import styled from 'styled-components';

export const DashboardReportsFunnels = styled.div.attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'dashboard-reports-funnels',
			style: {
				width: expanded ? (void 0) : 'calc(var(--margin) * 2)',
				maxWidth: expanded ? 600 : 'calc(var(--margin) * 2)',
				borderBottom: expanded ? 'var(--border)' : (void 0),
				borderRight: expanded ? 'var(--border)' : (void 0),
				backgroundColor: expanded ? 'var(--bg-color)' : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	display                    : flex;
	position                   : absolute;
	align-items                : center;
	top                        : 0;
	left                       : 0;
	min-height                 : calc(var(--margin) * 1.5);
	padding                    : calc(var(--margin) / 4) calc(var(--margin) / 2);
	border-bottom-right-radius : calc(var(--border-radius) * 2);
	transition                 : width 300ms ease-in-out;
	overflow-x                 : hidden;
	z-index                    : 2;
`;
export const DashboardReportsFunnelsButton = styled.div.attrs<{ expanded: boolean }>(
	() => {
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
	z-index         : 1;
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
	flex-grow             : 1;
	grid-template-columns : auto 1fr;
	padding-right         : var(--margin);
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
