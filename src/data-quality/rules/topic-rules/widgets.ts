import styled from 'styled-components';

export const TopicRuleRow = styled.div`
	display: grid;
	grid-template-columns: 40px 280px 350px 85px 100px 400px;
	height: var(--height);
	border-bottom: var(--border);
`;
export const TopicRuleCell = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	padding: 0 calc(var(--margin) / 2);
	border-right: var(--border);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	> div[data-widget=dropdown] {
		border: 0;
		margin: calc(var(--margin) / -2);
		padding: 0 calc(var(--margin) / 2);
		width: calc(100% + var(--margin));
		span[data-widget="dropdown-option"] {
			padding: 0 calc(var(--margin) / 2);
		}
	}
`;
export const TopicRuleSeqCell = styled(TopicRuleCell)`
	padding: 0 calc(var(--margin) / 4);
`;
export const TopicRuleEnablementCell = styled(TopicRuleCell)`
	justify-content: center;
`;
