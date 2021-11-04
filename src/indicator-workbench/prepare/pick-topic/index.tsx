import {FactorId} from '@/services/data/tuples/factor-types';
import {TopicId} from '@/services/data/tuples/topic-types';
import {useEffect} from 'react';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {DropMeAndFollowingButton, Step, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

interface TopicOrFactorCandidate extends SearchItem {
	topicId: TopicId;
	factorId?: FactorId;
}

const ActivePart = () => {
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

	return <StepTitle buttons={<DropMeAndFollowingButton stepIndex={2} previousStep={PrepareStep.CREATE_OR_FIND}/>}>
		<SearchText search={search} onSelectionChange={onSelectionChange}
		            buttonFirst={true} alwaysShowSearchInput={true}
		            openText="Pick a Topic or Factor"
		            placeholder="Find by topic name, factor name."/>
	</StepTitle>;
};

export const PickTopic = () => {
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	useStep({
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
			<ActivePart/>
		</SearchTextEventBusProvider>
	</Step>;
};