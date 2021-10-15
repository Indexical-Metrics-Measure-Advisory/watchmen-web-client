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
