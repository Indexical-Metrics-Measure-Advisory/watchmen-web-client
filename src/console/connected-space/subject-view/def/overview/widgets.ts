import styled from 'styled-components';

export const OverviewContainer = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'subject-def-select',
		'data-v-scroll': '',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	overflow-y     : auto;
	overflow-x     : hidden;
	border-right   : var(--border);
`;
export const OverviewBottomGap = styled.div.attrs({'data-widget': 'subject-def-select-bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const OverviewPanelContainer = styled.div.attrs({'data-widget': 'subject-def-select-container'})`
	flex-grow             : 1;
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	align-content         : start;
	padding               : calc(var(--margin) / 2) var(--margin) 0;
`;
