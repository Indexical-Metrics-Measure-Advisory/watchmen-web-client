import styled from 'styled-components';

export const DashboardReportsFunnels = styled.div.attrs({'data-widget': 'dashboard-reports-funnels'})`
	display     : flex;
	position    : absolute;
	align-items : center;
	top         : calc(var(--margin) / 2);
	left        : calc(var(--margin) / 2);
`;
export const DashboardReportsFunnelsButton = styled.div.attrs({'data-widget': 'dashboard-reports-funnels-button'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	color           : var(--primary-color);
	height          : var(--margin);
	width           : var(--margin);
	border-radius   : 100%;
	box-shadow      : var(--primary-shadow);
	cursor          : pointer;
	opacity         : 0.5;
	transition      : box-shadow 300ms ease-in-out, opacity 300ms ease-in-out;
	&:hover {
		opacity    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;