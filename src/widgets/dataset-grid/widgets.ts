import styled from 'styled-components';

export const DataSetGridContainer = styled.div.attrs({'data-widget': 'dataset-grid'})`
	display          : flex;
	position         : absolute;
	flex-direction   : column;
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	background-color : var(--bg-color);
	overflow         : hidden;
`;
