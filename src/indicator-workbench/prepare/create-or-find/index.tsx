import {ButtonInk} from '@/widgets/basic/types';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {SearchText} from '../search-text';
import {SearchTextEventBusProvider, useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';
import {Step, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {Label, Title} from './widgets';

const ActivePart = () => {
	const {fire} = useIndicatorsEventBus();
	const {fire: fireSearch} = useSearchTextEventBus();
	const state = useStep({step: PrepareStep.CREATE_OR_FIND});

	const onCreateClicked = () => {
		fireSearch(SearchTextEventTypes.HIDE_SEARCH);
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.PICK_TOPIC);
	};

	return <Title visible={state.current}>
		<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			Create An Indicator
		</StepTitleButton>
		<Label>Or</Label>
		<SearchText/>
	</Title>;
};

const DonePart = () => {
	const state = useStep({step: PrepareStep.CREATE_OR_FIND});

	return <Title visible={state.done}>
		<StepTitleButton ink={ButtonInk.SUCCESS} asLabel={true}>
			On Creating An Indicator
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