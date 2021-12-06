import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionButton} from '../widgets';
import {ButtonsContainer} from './widgets';

export const Buttons = () => {
	const {fire: fireGlobal} = useEventBus();
	const {visible, inspection} = useVisibleOnII();

	if (!visible) {
		return null;
	}

	const onLoadDataClicked = () => {
		if (inspection?.indicatorId == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_IS_REQUIRED}
			</AlertLabel>);
			return;
		}
		if (inspection.aggregateArithmetics == null || inspection.aggregateArithmetics.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.AGGREGATE_ARITHMETICS_IS_REQUIRED}
			</AlertLabel>);
			return;
		}
	};
	const onPickAnotherClicked = () => {
	};

	return <ButtonsContainer>
		<span/>
		<InspectionButton ink={ButtonInk.PRIMARY} onClick={onLoadDataClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.REFRESH_DATA}
		</InspectionButton>
		<InspectionButton ink={ButtonInk.DANGER} onClick={onPickAnotherClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_ANOTHER}
		</InspectionButton>
	</ButtonsContainer>;
};