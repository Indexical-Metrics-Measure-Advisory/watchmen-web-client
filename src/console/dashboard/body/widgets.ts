import styled from 'styled-components';

export const DashboardBodyContainer = styled.div.attrs({
	'data-widget': 'dashboard-body',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	flex-grow : 1;
	display   : block;
	position  : relative;
	overflow  : auto;
	@media print {
		overflow : unset;
	}
`;
export const DashboardNoReport = styled.div.attrs({'data-widget': 'dashboard-no-reports'})`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	font-family     : var(--title-font-family);
	font-size       : 2em;
	opacity         : 0.7;
	> span {
		margin-top : -10%;
	}
`;
