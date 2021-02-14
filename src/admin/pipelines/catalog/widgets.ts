import styled from 'styled-components';
import { PageHeaderContainer, PageTitle } from '../../../basic-widgets/page-header';

export const Header = styled(PageHeaderContainer)`
	border-bottom : var(--border);
	padding       : 0 calc(var(--margin) / 2);
`;
export const HeaderTitle = styled(PageTitle).attrs({ 'data-widgets': 'pipelines-header-title' })`
`;

export const BodyContainer = styled.div.attrs({ 'data-widget': 'pipelines-catalog' })`
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
export const BodySvg = styled.svg.attrs({ 'data-widget': 'pipelines-catalog-svg' })`
	display    : block;
	min-width  : 100%;
	min-height : 100%;
`;
export const BodySvgRelationsAnimationContainer = styled.div.attrs({ 'data-widget': 'body-catalog-relations-animation' })`
	display  : flex;
	position : absolute;
	top      : 0;
	left     : 0;
`;
