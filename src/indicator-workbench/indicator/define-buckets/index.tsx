import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useRef} from 'react';
import {EmphaticSinkingLabel, Step, StepBody, StepBodyButtons, StepTitle, StepTitleButton} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {BucketsDef} from './buckets-def';
import {BucketsEventBusProvider} from './buckets-event-bus';

export const DefineBuckets = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data, done} = useStep({
		step: IndicatorDeclarationStep.DEFINE_BUCKETS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const onIgnoreDefineClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, IndicatorDeclarationStep.SAVE_INDICATOR, data);
	};

	return <BucketsEventBusProvider>
		<Step index={IndicatorDeclarationStep.DEFINE_BUCKETS} visible={visible} ref={ref}>
			<StepTitle visible={visible}>
				<EmphaticSinkingLabel>{Lang.INDICATOR_WORKBENCH.INDICATOR.DEFINE_BUCKETS_TITLE}</EmphaticSinkingLabel>
			</StepTitle>
			<StepBody visible={visible}>
				{data != null ? <BucketsDef data={data}/> : null}
				{done
					? null
					: <StepBodyButtons>
						<StepTitleButton ink={ButtonInk.DANGER} onClick={onIgnoreDefineClicked}>
							{Lang.INDICATOR_WORKBENCH.INDICATOR.IGNORE_DEFINE_BUCKETS}
						</StepTitleButton>
					</StepBodyButtons>}
			</StepBody>
		</Step>
	</BucketsEventBusProvider>;
};