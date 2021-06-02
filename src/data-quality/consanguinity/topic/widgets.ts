import styled from 'styled-components';
import {ExecutionResultClickableItem, ExecutionResultItem} from '../../widgets/cli/execution/widgets';

export const TopicName = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	grid-column: span 3;
	color: var(--warn-color);
	font-weight: var(--font-boldest);
`;

export const PipelineGroup = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	color: var(--warn-color);
	font-weight: var(--font-bold);
	grid-column: 1;
`;
export const PipelineName = styled(ExecutionResultClickableItem)`
	grid-column: 2;
`;

export const NotUsedFactorsGroup = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	color: var(--warn-color);
	font-weight: var(--font-bold);
	grid-column: 1;
`;
export const FactorName = styled(ExecutionResultItem)`
	grid-column: 2;
`;
export const FactorNotUsedReason = styled(ExecutionResultItem)`
	grid-column: 3;
`;
