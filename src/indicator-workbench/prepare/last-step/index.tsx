import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {
	EmphaticSinkingLabel,
	Step,
	StepBody,
	StepBodyButtons,
	StepTitle,
	StepTitleButton,
	useStep
} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

export const LastStep = () => {
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	useStep({
		step: PrepareStep.LAST_STEP,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onRestartClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
	};

	return <Step index={6} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.PREPARE.LAST_STEP_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<StepBodyButtons>
				<StepTitleButton ink={ButtonInk.SUCCESS} onClick={onRestartClicked}>
					{Lang.INDICATOR_WORKBENCH.PREPARE.RESTART}
				</StepTitleButton>
			</StepBodyButtons>
		</StepBody>
	</Step>;
};