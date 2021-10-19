import styled from 'styled-components';

export const ShareDashboardContainer = styled.div.attrs({'data-widget': 'shared-dashboard'})`
	> div {
		min-height : 100vh;
	}
`;
export const NoData = styled.div.attrs<{ background: string }>(({background}) => {
	return {
		'data-widget': 'admin-dashboard-no-data',
		style: {
			backgroundImage: `url(${background})`
		}
	};
})<{ background: string }>`
	width               : 100%;
	height              : 50%;
	background-repeat   : no-repeat;
	background-size     : contain;
	background-position : center;
	filter              : drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.7)) grayscale(0.9);
	transition          : all 300ms ease-in-out;
`;
