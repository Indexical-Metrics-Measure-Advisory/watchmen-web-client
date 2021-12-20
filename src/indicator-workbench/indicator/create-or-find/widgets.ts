import styled from 'styled-components';
import {StepTitle} from '../../step-widgets';

export const Title = styled(StepTitle)`
	> button:first-child {
		margin-right : calc(var(--margin) / 2);
	}
`;
