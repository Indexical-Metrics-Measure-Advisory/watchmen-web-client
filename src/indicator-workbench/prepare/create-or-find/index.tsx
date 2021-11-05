import {fetchIndicatorsForSelection} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId, QueryIndicator} from '@/services/data/tuples/indicator-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {Step, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {Label, Title} from './widgets';

interface IndicatorCandidate extends SearchItem {
	indicatorId: IndicatorId;
}

const ActivePart = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const {fire: fireSearch} = useSearchTextEventBus();
	const state = useStep({step: PrepareStep.CREATE_OR_FIND});

	const onCreateClicked = () => {
		fire(IndicatorsEventTypes.CREATE_INDICATOR, (indicator: Indicator) => {
			fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.PICK_TOPIC, {indicator});
			fireSearch(SearchTextEventTypes.HIDE_SEARCH);
		});
	};
	const search = async (text: string): Promise<Array<IndicatorCandidate>> => {
		return new Promise<Array<IndicatorCandidate>>(resolve => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchIndicatorsForSelection(text),
				(candidates: Array<QueryIndicator>) => {
					resolve(candidates.map(candidate => {
						return {
							indicatorId: candidate.indicatorId,
							key: candidate.indicatorId,
							text: candidate.name
						};
					}));
				}, () => resolve([]));
		});
	};
	const onSelectionChange = async (item: IndicatorCandidate) => {
		fire(IndicatorsEventTypes.PICK_INDICATOR, item.indicatorId, (data: IndicatorsData) => {
			fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.MEASURE_METHODS, data);
			fireSearch(SearchTextEventTypes.HIDE_SEARCH);
		});
	};

	return <Title visible={state.active}>
		<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			Create An Indicator
		</StepTitleButton>
		<Label>Or</Label>
		<SearchText search={search} onSelectionChange={onSelectionChange}
		            openText="Find Existed Indicator" closeText="Discard Finding"
		            placeholder="Find by indicator name, topic name or factor name."/>
	</Title>;
};

const DonePart = () => {
	const state = useStep({step: PrepareStep.CREATE_OR_FIND});

	return <Title visible={state.done}>
		<StepTitleButton ink={ButtonInk.SUCCESS} asLabel={true}>
			Creating An Indicator
		</StepTitleButton>
	</Title>;
};

export const CreateOrFind = () => {
	return <Step index={1}>
		<SearchTextEventBusProvider>
			<ActivePart/>
		</SearchTextEventBusProvider>
		<DonePart/>
	</Step>;
};