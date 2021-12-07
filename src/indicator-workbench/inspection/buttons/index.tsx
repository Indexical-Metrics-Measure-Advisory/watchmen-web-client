import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionInvalidReason, validateInspection} from '../utils';
import {InspectionButton} from '../widgets';
import {ButtonsContainer} from './widgets';

export const Buttons = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useInspectionEventBus();
	const {visible, inspection} = useVisibleOnII();

	if (!visible) {
		return null;
	}

	const onLoadDataClicked = async () => {
		validateInspection({
			inspection: inspection ?? (void 0),
			success: inspection => {
				fire(InspectionEventTypes.SAVE_INSPECTION, inspection, (inspection, saved) => {
					saved && fire(InspectionEventTypes.REFRESH_DATA, inspection);
				});
			},
			fail: reason => {
				let message;
				switch (reason) {
					case InspectionInvalidReason.INDICATOR_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_IS_REQUIRED;
						break;
					case InspectionInvalidReason.AGGREGATE_ARITHMETICS_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.AGGREGATE_ARITHMETICS_IS_REQUIRED;
						break;
					case InspectionInvalidReason.MEASURE_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_IS_REQUIRED;
						break;
					case InspectionInvalidReason.INDICATOR_BUCKET_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_BUCKET_IS_REQUIRED;
						break;
					case InspectionInvalidReason.MEASURE_BUCKET_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_BUCKET_IS_REQUIRED;
						break;
				}
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>);
			}
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