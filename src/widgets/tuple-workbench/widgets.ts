import styled from 'styled-components';

export const TupleWorkbenchHeaderContainer = styled.div.attrs({'data-widget': 'tuple-report-workbench-header'})`
	display               : grid;
	grid-template-columns : 1fr auto auto auto auto auto auto auto;
	margin-top            : var(--margin);
	margin-bottom         : calc(var(--margin) * 2);
`;
export const TuplePropertyQuestionMarkContainer = styled.span.attrs({'data-widget': 'tuple-property-question-mark'})`
	margin-top  : 2px;
	margin-left : calc(var(--margin) / 4);
	color       : var(--info-color);
	opacity     : 0.5;
`;
