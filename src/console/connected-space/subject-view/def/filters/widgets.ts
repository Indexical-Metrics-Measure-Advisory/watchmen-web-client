import styled from 'styled-components';

export const FiltersContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-filters',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display      : flex;
	position     : relative;
	flex-direction : column;
	overflow-y     : auto;
	overflow-x     : hidden;
	border-right : var(--border);
`;
export const FiltersBottomGap = styled.div.attrs({ 'data-widget': 'subject-def-filters-bottom-gap' })`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const FiltersEditContainer = styled.div.attrs<{ visible: boolean }>(({ visible }) => {
	return {
		'data-widget': 'subject-def-filters-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) calc(var(--margin) / 2) 0;
`;
