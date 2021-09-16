import styled from 'styled-components';

export const GlobalRuleRow = styled.div`
	display               : grid;
	grid-template-columns : 40px 350px 85px 100px 400px;
	min-height            : calc(var(--height) + 1px);
	border-bottom         : var(--border);
	:hover {
		background-color : var(--hover-color);
	}
`;
export const GlobalRuleCell = styled.div`
	display       : flex;
	align-items   : center;
	height        : var(--height);
	padding       : 0 calc(var(--margin) / 2);
	border-right  : var(--border);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	> div[data-widget=checkbox] {
		border : 0;
	}
	> div[data-widget=dropdown] {
		border  : 0;
		margin  : calc(var(--margin) / -2);
		padding : 0 calc(var(--margin) / 2);
		width   : calc(100% + var(--margin));
		span[data-widget="dropdown-option"] {
			padding : 0 calc(var(--margin) / 2);
		}
	}
`;
export const GlobalRuleSeqCell = styled(GlobalRuleCell)`
	padding : 0 calc(var(--margin) / 4);
`;
export const GlobalRuleEnablementCell = styled(GlobalRuleCell)`
	justify-content : center;
`;
