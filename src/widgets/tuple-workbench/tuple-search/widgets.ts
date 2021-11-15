import styled from 'styled-components';
import {CarveButton} from '../../basic/button';

export const TupleSearchContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'tuple-search',
		style: {
			display: visible ? (void 0) : 'none',
			paddingBottom: visible ? (void 0) : 0,
			marginBottom: visible ? (void 0) : 0
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-bottom : calc(var(--margin) * 2);
	margin-bottom  : calc(var(--margin) * 2);
`;

export const NoData = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'tuple-search-no-data',
		style: {display: visible ? (void 0) : 'none'}
	};
})<{ visible: boolean }>`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	padding-top     : calc(var(--margin) / 2);
	grid-column     : span 3;
	font-family     : var(--title-font-family);
	font-weight     : var(--font-demi-bold);
	font-size       : 1.4em;
`;

export const TupleSearchList = styled.div.attrs({'data-widget': 'tuple-search-list'})`
	display               : grid;
	grid-column           : span 2;
	grid-template-columns : repeat(3, 1fr);
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 2);
	padding-top           : calc(var(--margin) / 2);
`;

export const TupleSearchListPagination = styled.div.attrs({'data-widget': 'tuple-search-list-pagination'})`
	grid-column : span 3;
	display     : flex;
	margin-top  : calc(var(--margin) / 2);
`;
export const TupleSearchListPaginationButton = styled(CarveButton).attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'tuple-search-list-pagination-button',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	line-height : 1.6em;
	font-weight : var(--font-demi-bold);
	&:last-child {
		margin-left : calc(var(--margin) / 2);
	}
`;
export const TupleSearchListPaginationPointer = styled.div.attrs({'data-widget': 'tuple-search-list-pagination-pointer'})`
	display         : flex;
	flex-grow       : 1;
	align-items     : center;
	justify-content : flex-end;
	padding         : 4px 0;
	font-family     : var(--title-font-family);
`;


