import {noop} from '@/services/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {ChangeEvent, useRef} from 'react';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {DescriptionText} from './widgets';

export const Description = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useIndicatorsEventBus();
	const saveQueue = useThrottler();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data} = useStep({
		step: IndicatorDeclarationStep.DESCRIPTION,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});
	const forceUpdate = useForceUpdate();

	if (!constructed) {
		return null;
	}

	const onDescriptionChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const {value} = event.target;

		if (value.length === 0 && (data?.indicator?.description ?? '').length === 0) {
			return;
		} else if (value === data?.indicator?.description) {
			return;
		}

		data!.indicator!.description = value;
		saveQueue.replace(() => {
			fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, noop);
		}, 500);
		forceUpdate();
	};

	return <Step index={IndicatorDeclarationStep.DESCRIPTION} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.INDICATOR.DESCRIPTION_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<DescriptionText value={data?.indicator?.description ?? ''}
			                 onChange={onDescriptionChanged}
			                 placeholder={Lang.PLAIN.INDICATOR_DESCRIPTION_PLACEHOLDER}/>
		</StepBody>
	</Step>;
};