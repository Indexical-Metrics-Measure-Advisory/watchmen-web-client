import styled from 'styled-components';

export const CatalogContainer = styled.div.attrs({'data-widget': 'connected-space-catalog'})`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : hidden;
`;
export const CatalogSvgContainer = styled.div.attrs({
	'data-widget': 'connected-space-catalog-svg-container',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display   : block;
	position  : relative;
	flex-grow : 1;
	overflow  : scroll;
`;
export const CatalogSvg = styled.svg.attrs({'data-widget': 'connected-space-catalog-svg'})`
	display    : block;
	min-width  : 100%;
	min-height : 100%;
`;
export const CatalogSvgRelationsAnimationContainer = styled.div.attrs({'data-widget': 'connected-space-catalog-relations-animation'})`
	display  : flex;
	position : absolute;
	top      : 0;
	left     : 0;
`;
