import {isIndicatorFactor} from '@/services/data/tuples/factor-calculator-utils';
import {Factor} from '@/services/data/tuples/factor-types';
import {fetchTopicsForIndicatorSelection} from '@/services/data/tuples/indicator';
import {TopicForIndicator} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasure} from '@/services/data/tuples/indicator-utils';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useEffect} from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {DropMeAndFollowingButton, Step, StepTitle, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

interface TopicOrFactorCandidate extends SearchItem {
	topic: TopicForIndicator;
	factor?: Factor;
}

const ActivePart = (props: { data?: IndicatorsData; visible: boolean }) => {
	const {data, visible} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const {fire: fireSearch} = useSearchTextEventBus();
	useEffect(() => {
		fireSearch(SearchTextEventTypes.FOCUS);
	}, [fireSearch]);

	const search = async (text: string): Promise<Array<TopicOrFactorCandidate>> => {
		return new Promise<Array<TopicOrFactorCandidate>>(resolve => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicsForIndicatorSelection(text),
				(candidates: Array<TopicForIndicator>) => {
					resolve(candidates.map(candidate => {
						return [
							{topic: candidate, key: `topic-${candidate.topicId}`, text: candidate.name},
							...(candidate.factors || []).filter(factor => {
								return isIndicatorFactor(factor.type);
							}).map(factor => {
								return {
									topic: candidate,
									factor,
									key: `factor-${candidate.topicId}-${factor.factorId}`,
									text: `${candidate.name}.${factor.name}`
								};
							})
						];
					}).flat());
				}, () => resolve([]));
		});
	};
	const onSelectionChange = async (item: TopicOrFactorCandidate) => {
		const {indicator} = data!;
		indicator!.topicId = item.topic.topicId;
		indicator!.factorId = item.factor?.factorId;
		data!.topic = item.topic;

		indicator!.measures = [];
		// analysis topic to find measure dimensions
		(data!.topic.factors || []).forEach(factor => {
			const measures = tryToTransformToMeasure(factor);
			if (measures == null) {
				// ignore
			} else if (Array.isArray(measures)) {
				indicator!.measures.push(...measures);
			} else {
				indicator!.measures.push(measures);
			}
		});

		fire(IndicatorsEventTypes.PICK_TOPIC, data!, (data: IndicatorsData) => {
			fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.MEASURE_METHODS, data);
			fireSearch(SearchTextEventTypes.HIDE_SEARCH);
		});
	};

	return <StepTitle buttons={<DropMeAndFollowingButton stepIndex={2} previousStep={PrepareStep.CREATE_OR_FIND}/>}
	                  visible={visible}>
		<SearchText search={search} onSelectionChange={onSelectionChange}
		            buttonFirst={true} alwaysShowSearchInput={true}
		            openText="Pick a Topic or Factor"
		            placeholder="Find by topic name, factor name."/>
	</StepTitle>;
};

const DonePart = (props: { data?: IndicatorsData; visible: boolean }) => {
	const {data, visible} = props;

	const {indicator, topic} = data ?? {};
	const topicName = topic?.name;
	// eslint-disable-next-line
	const factor = indicator?.factorId == null ? null : ((topic?.factors || []).find(factor => factor.factorId == indicator.factorId) ?? null);
	const factorName = factor?.name;

	return <StepTitle buttons={<DropMeAndFollowingButton stepIndex={2} previousStep={PrepareStep.CREATE_OR_FIND}/>}
	                  retractButtons={true}
	                  visible={visible}>
		<StepTitleButton ink={ButtonInk.SUCCESS} asLabel={true}>
			Define on Topic [ {topicName}{factorName ? `.${factorName}` : ''} ]
		</StepTitleButton>
	</StepTitle>;
};

export const PickTopic = () => {
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	const {data, active, done} = useStep({
		step: PrepareStep.PICK_TOPIC,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	return <Step index={2} visible={visible}>
		<SearchTextEventBusProvider>
			<ActivePart data={data} visible={active}/>
		</SearchTextEventBusProvider>
		<DonePart data={data} visible={done}/>
	</Step>;
};