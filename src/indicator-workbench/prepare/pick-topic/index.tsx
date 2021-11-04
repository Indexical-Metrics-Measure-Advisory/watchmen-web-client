import {Factor} from '@/services/data/tuples/factor-types';
import {fetchTopicsForIndicatorSelection} from '@/services/data/tuples/indicator';
import {QueryTopicForIndicator} from '@/services/data/tuples/indicator-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useEffect} from 'react';
import {IndicatorsData} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {DropMeAndFollowingButton, Step, StepTitle, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

interface TopicOrFactorCandidate extends SearchItem {
	topic: QueryTopicForIndicator;
	factor?: Factor;
}

const ActivePart = (props: { data?: IndicatorsData; visible: boolean }) => {
	const {visible} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useSearchTextEventBus();
	useEffect(() => {
		fire(SearchTextEventTypes.FOCUS);
	}, [fire]);

	const search = async (text: string): Promise<Array<TopicOrFactorCandidate>> => {
		return new Promise<Array<TopicOrFactorCandidate>>(resolve => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicsForIndicatorSelection(text),
				(candidates: Array<QueryTopicForIndicator>) => {
					resolve(candidates.map(candidate => {
						return [
							{topic: candidate, key: `topic-${candidate.topicId}`, text: candidate.name},
							...(candidate.factors || []).map(factor => {
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
		// TODO
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