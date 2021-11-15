import styled from 'styled-components';
import {Button} from '../../basic/button';
import {Input} from '../../basic/input';

export const TupleSearchBarContainer = styled.div.attrs<{ noIndent: boolean }>(({noIndent}) => {
	return {
		'data-widget': 'tuple-search-bar',
		style: {
			gridColumn: noIndent ? 'span 2' : (void 0)
		}
	};
})<{ noIndent: boolean }>`
	display     : flex;
	align-items : center;
`;
export const TupleSearchButton = styled(Button).attrs({'data-widget': 'tuple-search-button'})`
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
export const TupleSearchInput = styled(Input).attrs({'data-widget': 'tuple-search-input'})`
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
