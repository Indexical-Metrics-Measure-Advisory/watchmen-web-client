import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';
import { Input } from '../../../../basic-widgets/input';

export const TupleSearchBarContainer = styled.div.attrs<{ noIndent: boolean }>(({ noIndent }) => {
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
export const TupleSearchButton = styled(Button).attrs<{ search: boolean, noIndent: boolean }>(
	({ search, noIndent }) => {
		return {
			'data-widget': 'tuple-search-button',
			style: {
				borderTopLeftRadius: noIndent ? 'calc(var(--border-radius) * 2)' : (void 0),
				borderBottomLeftRadius: noIndent ? 'calc(var(--border-radius) * 2)' : (void 0),
				borderTopRightRadius: search ? (void 0) : 'calc(var(--border-radius) * 2)',
				borderBottomRightRadius: search ? (void 0) : 'calc(var(--border-radius) * 2)'
			}
		};
	})<{ search: boolean, noIndent: boolean }>`
	font-size        : 1.6em;
	width            : 44px;
	min-width        : 44px;
	height           : 44px;
	line-height      : 44px;
	background-color : var(--border-color);
	border-radius    : 0;
	padding          : 0;
	cursor           : pointer;
	> svg {
		font-size : 0.7em;
	}
`;
export const TupleSearchInput = styled(Input).attrs<{ search: boolean }>(({ search }) => {
	return {
		'data-widget': 'tuple-search-input',
		style: {
			padding: search ? '0 calc(var(--margin) / 2)' : (void 0),
			borderStyle: search ? 'solid' : (void 0),
			borderRightWidth: search ? 2 : (void 0),
			borderTopRightRadius: search ? 'calc(var(--border-radius) * 2)' : (void 0),
			borderBottomRightRadius: search ? 'calc(var(--border-radius) * 2)' : (void 0),
			width: search ? '100%' : (void 0)
		}
	};
})<{ search: boolean }>`
	border-radius      : 0;
	border-width       : 2px;
	border-color       : var(--border-color);
	border-left        : 0;
	border-right-width : 0;
	padding            : 0;
	font-size          : 1.6em;
	line-height        : 1.8em;
	width              : 0;
	height             : 44px;
	transition         : all 300ms ease-in-out;
`;
