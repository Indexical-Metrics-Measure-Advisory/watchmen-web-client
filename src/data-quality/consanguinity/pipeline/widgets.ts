import styled from 'styled-components';
import {ExecutionResultClickableItem, ExecutionResultItem} from '../../widgets/cli/execution/widgets';

export const PipelineName = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	grid-column: span 3;
	color: var(--warn-color);
	font-weight: var(--font-boldest);
`;

export const TopicGroup = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	color: var(--warn-color);
	font-weight: var(--font-bold);
	grid-column: 1;
`;
export const TopicName = styled(ExecutionResultClickableItem)`
	grid-column: 2;
`;
export const FactorName = styled(ExecutionResultItem)`
	grid-column: 3;
`;