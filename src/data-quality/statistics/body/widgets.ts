import styled from 'styled-components';

export const StatisticsBodyContainer = styled.div.attrs(() => {
	return {'data-widget': 'statistics-body'};
})`
	display               : grid;
	grid-template-columns : var(--header-height) 1fr 1fr var(--header-height);
	grid-column-gap       : var(--margin);
	grid-template-rows    : var(--header-height) 1fr 1fr var(--header-height);
	grid-row-gap          : var(--margin);
	padding               : var(--margin) calc(var(--margin) / 2);
	width                 : 100%;
	min-height            : calc(100vh - var(--page-header-height));
	transition            : all 300ms ease-in-out;
`;
