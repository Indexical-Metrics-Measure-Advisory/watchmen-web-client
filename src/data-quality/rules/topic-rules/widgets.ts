import styled from 'styled-components';

export const TopicRuleRow = styled.div`
	display               : grid;
	grid-template-columns : 40px 280px 350px 85px 100px 400px;
	min-height            : calc(var(--height) + 1px);
	border-bottom         : var(--border);
	:hover {
		background-color : var(--hover-color);
	}
`;
export const TopicRuleCell = styled.div`
	display       : flex;
	align-items   : center;
	min-height    : var(--height);
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
		margin  : 0 calc(var(--margin) / -2);
		padding : 0 calc(var(--margin) / 2);
		width   : calc(100% + var(--margin));
		span[data-widget="dropdown-option"] {
			padding : 0 calc(var(--margin) / 2);
		}
	}
`;
export const TopicRuleSeqCell = styled(TopicRuleCell)`
	padding : 0 calc(var(--margin) / 4);
`;
export const TopicRuleEnablementCell = styled(TopicRuleCell)`
	justify-content : center;
`;

export const FactorRow = styled.div.attrs<{ rows: number }>(({rows}) => {
	return {
		style: {
			minHeight: `calc((var(--height) + 1px) * ${rows} + 1px)`
		}
	};
})<{ rows: number }>`
	display               : grid;
	grid-template-columns : 40px 280px 1fr;
	border-bottom         : var(--border);
	&:hover {
		> div:first-child,
		> div:nth-child(2) {
			background-color : var(--hover-color);
		}
	}
`;
export const FactorRuleRow = styled(TopicRuleRow)`
	grid-template-columns : 350px 85px 100px 400px;
	&:last-child {
		border-bottom : 0;
	}
`;
export const FactorRuleNameCell = styled(TopicRuleCell).attrs<{ rows: number }>(({rows}) => {
	return {
		style: {
			gridRow: `span ${rows}`
		}
	};
})<{ rows: number }>`
	align-items : flex-start;
	line-height : var(--height);
`;
export const FactorRuleSeqCell = styled(TopicRuleSeqCell).attrs<{ rows: number }>(({rows}) => {
	return {
		style: {
			gridRow: `span ${rows}`
		}
	};
})<{ rows: number }>`
	align-items : flex-start;
	line-height : var(--height);
`;

