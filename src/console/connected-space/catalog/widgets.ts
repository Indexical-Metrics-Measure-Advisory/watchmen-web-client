import styled from 'styled-components';

export const CatalogContainer = styled.div.attrs({ 'data-widget': 'connected-space-catalog' })`
	display          : block;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : hidden;
`;