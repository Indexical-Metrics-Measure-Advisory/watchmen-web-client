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

export const SubjectDefContainer = styled.div.attrs({ 'data-widget': 'subject-def' })`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	overflow       : hidden;
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
