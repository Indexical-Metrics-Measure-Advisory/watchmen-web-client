import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';

export const TopicNavigatorContainer = styled.div.attrs<{ visible: boolean }>(({ visible }) => {
	return {
		'data-widget': 'topic-navigator',
		style: {
			marginRight: visible ? 0 : -300
		}
	};
})<{ visible: boolean }>`
	display          : flex;
	flex-direction   : column;
	position         : relative;
	width            : 300px;
	min-width        : 300px;
	background-color : var(--bg-color);
	overflow         : hidden;
	transition       : margin-right 300ms ease-in-out;
`;

export const TopicNavigatorHeader = styled.div.attrs({ 'data-widget': 'topic-navigator-header' })`
	display         : flex;
	height          : var(--header-height);
	align-items     : center;
	justify-content : space-between;
	padding         : 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	border-bottom   : var(--border);
	font-family     : var(--title-font-family);
	font-size       : 1.2em;
`;
export const TopicNavigatorHeaderTitle = styled.div.attrs({ 'data-widget': 'topic-navigator-header-title' })`
	flex-grow: 1;
`;
export const TopicNavigatorHeaderCloseButton = styled(Button).attrs({ 'data-widget': 'topic-navigator-header-close' })`
	padding: 0;
	width: var(--height);
	height: var(--height);
`;
