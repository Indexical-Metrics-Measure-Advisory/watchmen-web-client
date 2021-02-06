import styled from 'styled-components';

const COLLAPSE_WIDTH = 40;
const computeColumnWidths = (activeIndex: number) => {
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

export const SubjectDefContainer = styled.div.attrs({ 'data-widget': 'subject-def' })`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	overflow       : hidden;
`;

export const SubjectDefHeader = styled.div.attrs<{ activeIndex: number }>(({ activeIndex }) => {
	return {
		'data-widget': 'connected-space-subject-def-header',
		style: {
			gridTemplateColumns: computeColumnWidths(activeIndex)
		}
	};
})<{ activeIndex: number }>`
	display               : grid;
	grid-template-columns : 1fr repeat(4, ${COLLAPSE_WIDTH}px);
	position              : relative;
	height                : var(--grid-row-height);
	min-height            : var(--grid-row-height);
	border-bottom         : var(--border);
	transition            : all 300ms ease-in-out;
`;
export const DefHeaderCell = styled.div.attrs({ 'data-widget': 'subject-def-header-cell' })`
	display       : flex;
	position      : relative;
	align-items   : center;
	font-family   : var(--title-font-family);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : clip;
	padding-right : var(--input-indent);
	border-right  : var(--border);
	cursor        : pointer;
	&:last-child {
		border-right : 0;
	}
`;
export const DefHeaderIndex = styled.span.attrs({ 'data-widget': 'subject-def-header-index' })`
	display          : flex;
	justify-content  : center;
	font-variant     : petite-caps;
	background-color : var(--border-color);
	width            : 20px;
	padding          : 2px calc(var(--margin) / 4);
	margin           : 0 var(--input-indent);
	border-radius    : 50%;
`;

export const SubjectDefBody = styled.div.attrs<{ activeIndex: number }>(({ activeIndex }) => {
	return {
		'data-widget': 'connected-space-subject-def-body',
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
