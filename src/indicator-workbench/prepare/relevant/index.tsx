import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

export const Relevant = () => {
	const {fire: fireGlobal} = useEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	useStep({
		step: PrepareStep.RELEVANT_INDICATORS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onDetectClicked = () => {
		// TODO
		fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
	};

	return <Step index={5} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				Relevant indicators of current indicator were detected automatically.
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onDetectClicked}>
				Detect Potential Relevant Indicators
			</StepTitleButton>
		</StepBody>
	</Step>;
};