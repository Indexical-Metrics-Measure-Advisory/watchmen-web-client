import {ButtonInk} from '@/widgets/basic/types';
import styled from 'styled-components';
import {SinkingLabel, Step, StepTitle, StepTitleButton} from '../step-widgets';

const Title = styled(StepTitle)`
	> button:first-child {
		margin-right : calc(var(--margin) / 2);
	}
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
	margin-right   : calc(var(--margin) / 2);
`;

export const CreateOrFind = () => {
	return <Step index={1}>
		<Title>
			<StepTitleButton ink={ButtonInk.PRIMARY}>Create An Indicator</StepTitleButton>
			<Label>Or</Label>
			<StepTitleButton ink={ButtonInk.PRIMARY}>Find Existed Indicator</StepTitleButton>
		</Title>
	</Step>;
};