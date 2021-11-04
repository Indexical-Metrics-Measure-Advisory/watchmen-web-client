import {FactorId} from '@/services/data/tuples/factor-types';
import {TopicId} from '@/services/data/tuples/topic-types';
import {useEffect, useState} from 'react';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider} from '../search-text/search-text-event-bus';
import {DropMeAndFollowingButton, Step, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';

interface TopicOrFactorCandidate extends SearchItem {
	topicId: TopicId;
	factorId?: FactorId;
}

export const PickTopic = () => {
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useStep({
		step: PrepareStep.PICK_TOPIC,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});
	useEffect(() => {
		if (constructed) {
			setVisible(true);
		}
	}, [constructed]);
	useEffect(() => {
		if (!visible) {
			setTimeout(() => setConstructed(false), 310);
		}
	}, [visible]);

	if (!constructed) {
		return null;
	}

	const search = async (text: string): Promise<Array<TopicOrFactorCandidate>> => {
		// return new Promise<Array<IndicatorCandidate>>(resolve => {
		// 	fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
		// 		async () => await fetchIndicatorsForSelection(text),
		// 		(candidates: Array<QueryIndicator>) => {
		// 			resolve(candidates.map(candidate => {
		// 				return {
		// 					key: candidate.indicatorId,
		// 					text: candidate.name
		// 				};
		// 			}));
		// 		}, () => resolve([]));
		// });
		return new Promise(resolve => setTimeout(() => resolve([]), 500));
	};
	const onSelectionChange = async (item: TopicOrFactorCandidate) => {
		// TODO
	};

	return <Step index={2} visible={visible}>
		<StepTitle>
			<SearchTextEventBusProvider>
				<SearchText search={search} onSelectionChange={onSelectionChange}
				            buttonFirst={true}
				            openText="Pick a Topic or Factor" placeholder="By topic name, factor name."/>
			</SearchTextEventBusProvider>
			<DropMeAndFollowingButton stepIndex={2} previousStep={PrepareStep.CREATE_OR_FIND}/>
		</StepTitle>
	</Step>;
};