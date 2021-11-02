import {Button} from '@/widgets/basic/button';
import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const IndicatorSearchBarContainer = styled.div.attrs({'data-widget': 'indicator-search-bar'})`
	display     : flex;
	position    : relative;
	align-items : center;
`;
export const IndicatorSearchButton = styled(Button).attrs({'data-widget': 'indicator-search-button'})`
	font-size          : 1.6em;
	width              : 44px;
	min-width          : 44px;
	height             : 44px;
	line-height        : 44px;
	border-style       : solid;
	border-width       : 2px;
	border-color       : var(--border-color);
	border-right-width : 0;
	border-radius      : calc(var(--border-radius) * 2) 0 0 calc(var(--border-radius) * 2);
	padding            : 0;
	cursor             : default;
	&:hover {
		box-shadow : inherit;
	}
	> svg {
		font-size : 0.7em;
	}
`;
export const IndicatorSearchInput = styled(Input).attrs({'data-widget': 'indicator-search-input'})`
	border-radius      : 0;
	border-style       : solid;
	border-width       : 2px;
	border-color       : var(--border-color);
	border-left-width  : 0;
	border-right-width : 0;
	padding            : 0 calc(var(--margin) / 2) 0 0;
	font-size          : 1.6em;
	line-height        : 1.8em;
	width              : 100%;
	height             : 44px;
	transition         : all 300ms ease-in-out;
`;
