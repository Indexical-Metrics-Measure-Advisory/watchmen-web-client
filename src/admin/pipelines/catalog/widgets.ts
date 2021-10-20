import styled from 'styled-components';

export const BodyContainer = styled.div.attrs({'data-widget': 'pipelines-catalog'})`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : hidden;
`;
export const BodySvgContainer = styled.div.attrs({
	'data-widget': 'pipelines-catalog-svg-container',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display   : block;
	position  : relative;
	flex-grow : 1;
	overflow  : scroll;
`;
export const BodySvg = styled.svg.attrs({
	'data-widget': 'pipelines-catalog-svg',
	xmlns: 'http://www.w3.org/2000/svg'
})`
	display    : block;
	min-width  : 100%;
	min-height : 100%;
`;
export const MarkdownBodySvgContainer = styled.div`
	display        : block;
	position       : fixed;
	left           : 100%;
	top            : 100%;
	opacity        : 0;
	pointer-events : none;
	text[data-role=topic-name] {
		font-family : sans-serif;
	}
`;
export const BodySvgRelationsAnimationContainer = styled.div.attrs({'data-widget': 'body-catalog-relations-animation'})`
	display  : flex;
	position : absolute;
	top      : 0;
	left     : 0;
`;
