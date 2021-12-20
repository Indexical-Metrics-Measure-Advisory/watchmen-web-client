import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useRef} from 'react';
import {EmphaticSinkingLabel, Step, StepBody, StepBodyButtons, StepTitle, StepTitleButton} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';

export const LastStep = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	useStep({
		step: IndicatorDeclarationStep.LAST_STEP,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onRestartClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, IndicatorDeclarationStep.CREATE_OR_FIND);
	};

	return <Step index={IndicatorDeclarationStep.LAST_STEP} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.INDICATOR.LAST_STEP_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<StepBodyButtons>
				<StepTitleButton ink={ButtonInk.DANGER} onClick={onRestartClicked}>
					{Lang.INDICATOR_WORKBENCH.INDICATOR.PREPARE_ANOTHER}
				</StepTitleButton>
			</StepBodyButtons>
		</StepBody>
	</Step>;
};