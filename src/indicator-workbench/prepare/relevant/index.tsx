import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {
	EmphaticSinkingLabel,
	Step,
	StepBody,
	StepBodyButtons,
	StepBodyConjunctionLabel,
	StepTitle,
	StepTitleButton,
	useStep
} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

export const Relevant = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	const {data, active} = useStep({
		step: PrepareStep.RELEVANT_INDICATORS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onDetectClicked = () => {
		// TODO detect relevant indicators
		fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
	};
	const onIgnoreDetectClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.LAST_STEP, data);
	};

	return <Step index={PrepareStep.RELEVANT_INDICATORS} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.PREPARE.RELEVANT_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<StepBodyButtons>
				<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onDetectClicked}>
					{Lang.INDICATOR_WORKBENCH.PREPARE.DETECT_RELEVANT}
				</StepTitleButton>
				{active
					? <>
						<StepBodyConjunctionLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.OR}</StepBodyConjunctionLabel>
						<StepTitleButton ink={ButtonInk.DANGER} onClick={onIgnoreDetectClicked}>
							{Lang.INDICATOR_WORKBENCH.PREPARE.IGNORE_DETECT_RELEVANT}
						</StepTitleButton>
					</>
					: null}
			</StepBodyButtons>
		</StepBody>
	</Step>;
};