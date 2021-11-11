import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useRef, useState} from 'react';
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
import {BucketsDef} from './buckets-def';
import {BucketsEventBusProvider} from './buckets-event-bus';

export const DefineBuckets = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data, done} = useStep({
		step: PrepareStep.DEFINE_BUCKETS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});
	const [onDefine, setOnDefine] = useState(false);

	if (!constructed) {
		return null;
	}

	const onDefineClicked = () => {
		setOnDefine(true);
	};
	const onIgnoreDefineClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.SAVE_INDICATOR, data);
	};

	return <BucketsEventBusProvider>
		<Step index={PrepareStep.DEFINE_BUCKETS} visible={visible} ref={ref}>
			<StepTitle visible={visible}>
				<EmphaticSinkingLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.DEFINE_BUCKETS_TITLE}</EmphaticSinkingLabel>
			</StepTitle>
			<StepBody visible={visible}>
				{data != null ? <BucketsDef data={data} visible={onDefine}/> : null}
				{onDefine
					? done
						? null
						: <StepBodyButtons>
							<StepTitleButton ink={ButtonInk.DANGER} onClick={onIgnoreDefineClicked}>
								{Lang.INDICATOR_WORKBENCH.PREPARE.IGNORE_DEFINE_BUCKETS}
							</StepTitleButton>
						</StepBodyButtons>
					: <StepBodyButtons>
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
				}
			</StepBody>
		</Step>
	</BucketsEventBusProvider>;
};