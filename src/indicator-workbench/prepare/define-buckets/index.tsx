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

export const DefineBuckets = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	const {data, done} = useStep({
		step: PrepareStep.DEFINE_BUCKETS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onDefineClicked = () => {
		// TODO define buckets
		fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
	};
	const onIgnoreDefineClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.SAVE_INDICATOR, data);
	};

	return <Step index={PrepareStep.DEFINE_BUCKETS} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.DEFINE_BUCKETS_TITLE}</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<StepBodyButtons>
				<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onDefineClicked}>
					{Lang.INDICATOR_WORKBENCH.PREPARE.DEFINE_BUCKET}
				</StepTitleButton>
				{done
					? null
					: <>
						<StepBodyConjunctionLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.OR}</StepBodyConjunctionLabel>
						<StepTitleButton ink={ButtonInk.DANGER} onClick={onIgnoreDefineClicked}>
							{Lang.INDICATOR_WORKBENCH.PREPARE.IGNORE_DEFINE_BUCKETS}
						</StepTitleButton>
					</>}
			</StepBodyButtons>
		</StepBody>
	</Step>;
};