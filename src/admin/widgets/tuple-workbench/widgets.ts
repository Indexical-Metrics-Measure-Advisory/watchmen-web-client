import styled from 'styled-components';

export const TupleWorkbenchHeaderContainer = styled.div.attrs({ 'data-widget': 'tuple-workbench-header' })`
	display               : grid;
	grid-template-columns : auto 1fr;
	margin-top            : var(--margin);
	margin-bottom         : calc(var(--margin) / 2);
`;
