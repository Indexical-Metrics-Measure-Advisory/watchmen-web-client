import {fetchIndicatorsForSelection} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId, QueryIndicator} from '@/services/data/tuples/indicator-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {Step, StepTitleButton, StepTitleConjunctionLabel, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {Title} from './widgets';

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
			fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.LAST_STEP, data);
			fireSearch(SearchTextEventTypes.HIDE_SEARCH);
		});
	};

	return <Title visible={state.active}>
		<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.CREATE_INDICATOR}
		</StepTitleButton>
		<StepTitleConjunctionLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.OR}</StepTitleConjunctionLabel>
		<SearchText search={search} onSelectionChange={onSelectionChange}
		            openText={Lang.INDICATOR_WORKBENCH.PREPARE.FIND_INDICATOR}
		            closeText={Lang.INDICATOR_WORKBENCH.PREPARE.DISCARD_FIND_INDICATOR}
		            placeholder={Lang.PLAIN.FIND_INDICATOR_PLACEHOLDER}/>
	</Title>;
};

const DonePart = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useIndicatorsEventBus();
	const {data, done, activeStep} = useStep({step: PrepareStep.CREATE_OR_FIND});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorSaved = () => forceUpdate();
		on(IndicatorsEventTypes.INDICATOR_SAVED, onIndicatorSaved);
		return () => {
			off(IndicatorsEventTypes.INDICATOR_SAVED, onIndicatorSaved);
		};
	}, [on, off, forceUpdate]);

	const onRestartClicked = () => {
		fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
			Lang.INDICATOR_WORKBENCH.ON_EDIT,
			() => {
				fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
				fireGlobal(EventTypes.HIDE_DIALOG);
			}, () => fireGlobal(EventTypes.HIDE_DIALOG));
	};

	const label = (() => {
		if (data?.indicator == null || isFakedUuid(data.indicator)) {
			return Lang.INDICATOR_WORKBENCH.PREPARE.ON_CREATE_INDICATOR;
		} else {
			return <>
				{Lang.INDICATOR_WORKBENCH.PREPARE.ON_VIEW_INDICATOR}
				[ {data.indicator.name} ]
			</>;
		}
	})();

	return <Title visible={done}>
		<StepTitleButton ink={ButtonInk.SUCCESS} asLabel={true}>
			{label}
		</StepTitleButton>
		{activeStep !== PrepareStep.LAST_STEP && activeStep !== PrepareStep.CREATE_OR_FIND
			? <>
				<StepTitleConjunctionLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.OR}</StepTitleConjunctionLabel>
				<StepTitleButton ink={ButtonInk.DANGER} onClick={onRestartClicked}>
					{Lang.INDICATOR_WORKBENCH.PREPARE.RESTART}
				</StepTitleButton>
			</>
			: null}
	</Title>;
};

export const CreateOrFind = () => {
	return <Step index={PrepareStep.CREATE_OR_FIND}>
		<SearchTextEventBusProvider>
			<ActivePart/>
		</SearchTextEventBusProvider>
		<DonePart/>
	</Step>;
};