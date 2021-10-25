import styled from 'styled-components';

export const SubjectBodyContainer = styled.div.attrs({
	'data-widget': 'connected-space-navigator-subject',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	flex-grow             : 1;
	align-content         : start;
	padding               : calc(var(--margin) / 2);
	overflow-y            : auto;
	> div[data-widget="lead-keyword"]:not(:first-child) {
		margin-top : calc(var(--margin) / 2);
	}
`;
export const BottomGap = styled.div.attrs({'data-widget': 'bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;

