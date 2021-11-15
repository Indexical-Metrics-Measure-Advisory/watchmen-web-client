import styled from 'styled-components';

export const TupleWorkbenchHeaderContainer = styled.div.attrs({'data-widget': 'tuple-report-workbench-header'})`
	display               : grid;
	grid-template-columns : 1fr auto auto auto auto auto auto auto;
	margin-top            : var(--margin);
	margin-bottom         : calc(var(--margin) * 2);
`;
