import styled from 'styled-components';

export const COLLAPSE_WIDTH = 40;
export const computeColumnWidths = (activeIndex: number) => {
	switch (activeIndex) {
		case 1:
			return `1fr repeat(4, ${COLLAPSE_WIDTH}px)`;
		case 2:
			return `${COLLAPSE_WIDTH}px 1fr repeat(3, ${COLLAPSE_WIDTH}px)`;
		case 3:
			return `repeat(2, ${COLLAPSE_WIDTH}px) 1fr repeat(2, ${COLLAPSE_WIDTH}px)`;
		case 4:
			return `repeat(3, ${COLLAPSE_WIDTH}px) 1fr ${COLLAPSE_WIDTH}px`;
		case 5:
			return `repeat(4, ${COLLAPSE_WIDTH}px) 1fr`;
	}
};

export const SubjectDefContainer = styled.div.attrs({'data-widget': 'subject-def'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	overflow       : hidden;
`;

export const SubjectDefBody = styled.div.attrs<{ activeIndex: number }>(({activeIndex}) => {
	return {
		'data-widget': 'subject-def-body',
		style: {
			gridTemplateColumns: computeColumnWidths(activeIndex)
		}
	};
})<{ activeIndex: number }>`
	display               : grid;
	position              : relative;
	flex-grow             : 1;
	max-height            : calc(100% - var(--grid-row-height));
	grid-template-columns : 1fr repeat(4, ${COLLAPSE_WIDTH}px);
	transition            : all 300ms ease-in-out;
`;
export const SubjectDefBodyCover = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'subject-def-body-cover',
		style: {display: active ? 'none' : (void 0)}
	};
})<{ active: boolean }>`
	display          : block;
	position         : absolute;
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	padding-top      : calc(var(--margin) / 2);
	background-color : var(--bg-color);
	opacity          : 0.9;
	font-family      : var(--title-font-family);
	font-size        : 1.1em;
	writing-mode     : vertical-lr;
	line-height      : ${COLLAPSE_WIDTH}px;
	user-select      : none;
	z-index          : 1;
`;
export const SubjectDefNoData = styled.div.attrs<{ active: boolean, visible: boolean }>(({active, visible}) => {
	return {
		'data-widget': 'subject-def-body-no-data',
		style: {
			display: active && visible ? (void 0) : 'none'
		}
	};
})<{ active: boolean, visible: boolean }>`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	font-family     : var(--title-font-family);
	font-size       : 2em;
	opacity         : 0.7;
`;
export const SubjectDefNoDataCreateButton = styled.span.attrs({'data-widget': 'subject-def-body-no-data-create'})`
	text-decoration : underline;
	cursor          : pointer;
`;
