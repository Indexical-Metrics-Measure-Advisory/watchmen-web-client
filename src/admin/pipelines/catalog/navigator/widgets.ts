import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';

export const NavigatorContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'pipelines-navigator',
		style: {
			marginRight: visible ? 0 : -400
		}
	};
})<{ visible: boolean }>`
	display          : flex;
	flex-direction   : column;
	position         : relative;
	width            : 400px;
	min-width        : 400px;
	background-color : var(--bg-color);
	overflow         : hidden;
	transition       : margin-right 300ms ease-in-out;
`;

export const NavigatorHeader = styled.div.attrs({'data-widget': 'pipelines-navigator-header'})`
	display         : flex;
	min-height      : var(--header-height);
	height          : var(--header-height);
	align-items     : center;
	justify-content : space-between;
	padding         : 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	border-bottom   : var(--border);
	font-family     : var(--title-font-family);
	font-size       : 1.2em;
	cursor          : ${({onClick}) => onClick ? 'pointer' : (void 0)};
`;
export const NavigatorHeaderTitle = styled.div.attrs({'data-widget': 'pipelines-navigator-header-title'})`
	display     : flex;
	position    : relative;
	align-items : center;
	flex-grow   : 1;
`;
export const CountBadge = styled.span`
	display          : flex;
	position         : relative;
	align-items      : center;
	height           : calc(var(--header-height) * 0.5);
	padding          : 0 calc(var(--margin) / 4);
	margin-left      : calc(var(--margin) / 2);
	border-radius    : calc(var(--header-height) * 0.25);
	color            : var(--invert-color);
	background-color : var(--primary-color);
	font-size        : 0.8em;
	opacity          : 0.5;
`;
export const NavigatorHeaderButton = styled(TooltipButton).attrs({'data-widget': 'pipelines-navigator-header-button'})`
	padding : 0;
	width   : var(--height);
	height  : var(--height);
`;
