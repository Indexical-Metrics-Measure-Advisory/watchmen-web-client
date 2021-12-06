import {InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionButton} from '../widgets';
import {ButtonsContainer} from './widgets';

export const Buttons = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useInspectionEventBus();
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
		if (inspection.measureOnTimeFactorId == null && inspection.measureOn === InspectMeasureOn.NONE) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_IS_REQUIRED}
			</AlertLabel>);
			return;
		}
		if (inspection.measureOn === InspectMeasureOn.VALUE && inspection.measureOnBucketId == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_BUCKET_IS_REQUIRED}
			</AlertLabel>);
			return;
		}

		fire(InspectionEventTypes.SAVE_INSPECTION, inspection, (inspection, saved) => {
			saved && fire(InspectionEventTypes.REFRESH_DATA, inspection);
		});
	};
	const onPickAnotherClicked = () => {
		fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
			Lang.INDICATOR_WORKBENCH.INSPECTION.RESET_INSPECTION,
			() => {
				fire(InspectionEventTypes.CLEAR_INSPECTION);
				fireGlobal(EventTypes.HIDE_DIALOG);
			},
			() => fireGlobal(EventTypes.HIDE_DIALOG));
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