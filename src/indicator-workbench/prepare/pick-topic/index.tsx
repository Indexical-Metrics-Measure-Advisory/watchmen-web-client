import {FactorId} from '@/services/data/tuples/factor-types';
import {TopicId} from '@/services/data/tuples/topic-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useEffect} from 'react';
import {IndicatorsData} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {DropMeAndFollowingButton, Step, StepTitle, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

interface TopicOrFactorCandidate extends SearchItem {
	topicId: TopicId;
	factorId?: FactorId;
}

const ActivePart = (props: { data?: IndicatorsData; visible: boolean }) => {
	const {visible} = props;

	const {fire} = useSearchTextEventBus();
	useEffect(() => {
		fire(SearchTextEventTypes.FOCUS);
	}, [fire]);

	const search = async (text: string): Promise<Array<TopicOrFactorCandidate>> => {
		// TODO
		return new Promise(resolve => setTimeout(() => resolve([]), 500));
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