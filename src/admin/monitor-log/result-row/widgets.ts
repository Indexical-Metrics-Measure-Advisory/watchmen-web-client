import styled from 'styled-components';

export const SearchResultBodyRow = styled.div.attrs<{ detail: boolean }>(({detail}) => {
	return {
		'data-widget': 'monitor-logs-result-body-row',
		style: {
			height: detail ? 'unset' : (void 0),
			cursor: detail ? 'default' : (void 0)
		}
	};
})<{ detail: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 280px 280px 280px 200px 200px 200px;
	height                : var(--height);
	border-bottom         : var(--border);
	cursor                : pointer;
	&:hover {
		background-color : ${({detail}) => detail ? (void 0) : 'var(--hover-color)'};
	}
	&:before,
	&:after {
		content          : '';
		display          : ${({detail}) => detail ? 'none' : 'block'};
		position         : absolute;
		width            : 100%;
		height           : 1px;
		background-color : var(--invert-color);
		top              : 0;
		left             : 0;
	}
	&:after {
		top    : unset;
		bottom : 0;
	}
	> div {
		border-right-color : ${({detail}) => detail ? (void 0) : 'var(--invert-color)'};
		border-top-color   : ${({detail}) => detail ? (void 0) : 'var(--invert-color)'};
	}
`;
export const SearchResultBodyCell = styled.div.attrs({'data-widget': 'monitor-logs-result-body-cell'})`
	display      : flex;
	align-items  : center;
	height       : calc(var(--height) - 1px);
	padding      : 0 calc(var(--margin) / 2);
	border-right : var(--border);
	> span {
		overflow-x    : hidden;
		white-space   : nowrap;
		text-overflow : ellipsis;
	}
`;
export const SearchResultBodySeqCell = styled(SearchResultBodyCell)`
	padding : 0 calc(var(--margin) / 4);
`;
export const SearchResultBodyStatusCell = styled(SearchResultBodyCell)`
	text-transform : uppercase;
`;