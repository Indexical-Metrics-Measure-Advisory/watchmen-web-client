import {fetchRelevantIndicators} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId, RelevantIndicator, RelevantIndicatorType} from '@/services/data/tuples/indicator-types';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {RelevantIndicatorTypeLabels} from '@/widgets/basic/relevant-label';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useRef, useState} from 'react';
import {
	EmphaticSinkingLabel,
	Step,
	StepBody,
	StepBodyButtons,
	StepBodyConjunctionLabel,
	StepTitle,
	StepTitleButton
} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {
	NoRelevant,
	RelevantIndicatorsBodyCell,
	RelevantIndicatorsBodyRow,
	RelevantIndicatorsContainer,
	RelevantIndicatorsHeader,
	RelevantIndicatorsHeaderCell
} from './widgets';

export const Relevant = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const [detected, setDetected] = useState(false);
	const [indicators, setIndicators] = useState<Array<Indicator>>([]);
	const forceUpdate = useForceUpdate();
	const {data, done} = useStep({
		step: IndicatorDeclarationStep.RELEVANT_INDICATORS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => {
			setDetected(false);
			setIndicators([]);
			setVisible(false);
		}
	});

	if (!constructed) {
		return null;
	}

	const onRelevantTypeChanged = (indicator: Indicator, relevant?: RelevantIndicator) => (option: DropdownOption) => {
		const type = option.value as (RelevantIndicatorType | '');
		if (type === '') {
			if (relevant != null) {
				const index = data?.indicator?.relevants?.findIndex(ri => ri === relevant);
				if (index != null && index !== -1) {
					data!.indicator!.relevants!.splice(index, 1);
					fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, noop);
				}
			}
		} else {
			if (relevant != null) {
				relevant.type = type;
				fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, noop);
			} else {
				if (data!.indicator!.relevants == null) {
					data!.indicator!.relevants = [];
				}
				data!.indicator!.relevants.push({indicatorId: indicator.indicatorId, type});
				fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, noop);
			}
		}
		forceUpdate();
	};
	const onDetectClicked = () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				return await fetchRelevantIndicators(data!.indicator!.indicatorId!);
			}, (indicators: Array<Indicator>) => {
				setIndicators(indicators);
				setDetected(true);
			});
	};
	const onIgnoreDetectClicked = () => {
		fire(IndicatorsEventTypes.SWITCH_STEP, IndicatorDeclarationStep.LAST_STEP, data);
	};

	const relevantTypeOptions = [
		{value: '', label: Lang.INDICATOR_WORKBENCH.INDICATOR.IRRELEVANT},
		...[
			RelevantIndicatorType.SAME,
			RelevantIndicatorType.HIGH_CORRELATED, RelevantIndicatorType.WEAK_CORRELATED,
			RelevantIndicatorType.THIS_CAUSES_RELEVANT, RelevantIndicatorType.RELEVANT_CAUSES_THIS
		].map(type => {
			return {
				value: type,
				label: RelevantIndicatorTypeLabels[type]
			};
		})
	];

	const existsRelevantIndicators = (data?.indicator?.relevants || []).reduce((all, relevant) => {
		all[relevant.indicatorId] = relevant;
		return all;
	}, {} as Record<IndicatorId, RelevantIndicator>);
	const hasRelevantIndicator = indicators.length !== 0;

	return <Step index={IndicatorDeclarationStep.RELEVANT_INDICATORS} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.INDICATOR.RELEVANT_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			{hasRelevantIndicator
				? <RelevantIndicatorsContainer>
					<RelevantIndicatorsHeader>
						<RelevantIndicatorsHeaderCell/>
						<RelevantIndicatorsHeaderCell>
							{Lang.INDICATOR_WORKBENCH.INDICATOR.INDICATOR_NAME}
						</RelevantIndicatorsHeaderCell>
						<RelevantIndicatorsHeaderCell>
							{Lang.INDICATOR_WORKBENCH.INDICATOR.INDICATOR_RELEVANT_TYPE}
						</RelevantIndicatorsHeaderCell>
					</RelevantIndicatorsHeader>
					{indicators.map((indicator, index) => {
						const relevant = existsRelevantIndicators[indicator.indicatorId];
						return <RelevantIndicatorsBodyRow key={indicator.indicatorId}>
							<RelevantIndicatorsBodyCell>{index + 1}</RelevantIndicatorsBodyCell>
							<RelevantIndicatorsBodyCell>{indicator.name || 'Noname Indicator'}</RelevantIndicatorsBodyCell>
							<RelevantIndicatorsBodyCell>
								<Dropdown value={relevant?.type ?? ''} options={relevantTypeOptions}
								          onChange={onRelevantTypeChanged(indicator, relevant)}/>
							</RelevantIndicatorsBodyCell>
						</RelevantIndicatorsBodyRow>;
					})}
				</RelevantIndicatorsContainer>
				: (detected
					? <NoRelevant>
						{Lang.INDICATOR_WORKBENCH.INDICATOR.NO_RELEVANT_DETECTED}
					</NoRelevant>
					: null)}
			<StepBodyButtons>
				<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onDetectClicked}>
					{Lang.INDICATOR_WORKBENCH.INDICATOR.DETECT_RELEVANT}
				</StepTitleButton>
				{done
					? null
					: <>
						<StepBodyConjunctionLabel>{Lang.INDICATOR_WORKBENCH.INDICATOR.OR}</StepBodyConjunctionLabel>
						<StepTitleButton ink={ButtonInk.DANGER} onClick={onIgnoreDetectClicked}>
							{Lang.INDICATOR_WORKBENCH.INDICATOR.IGNORE_DETECT_RELEVANT}
						</StepTitleButton>
					</>}
			</StepBodyButtons>
		</StepBody>
	</Step>;
};