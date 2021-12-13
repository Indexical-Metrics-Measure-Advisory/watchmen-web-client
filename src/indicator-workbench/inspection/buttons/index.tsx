import {Inspection} from '@/services/data/tuples/inspection-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionInvalidReason, validateInspection} from '../utils';
import {InspectionButton} from '../widgets';
import {ButtonsContainer} from './widgets';

export const Buttons = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const {visible, inspection} = useVisibleOnII();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const onDataLoaded = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
			setLoading(false);
		};
		const onRefreshData = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
			setLoading(true);
		};
		on(InspectionEventTypes.DATA_LOADED, onDataLoaded);
		on(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		return () => {
			off(InspectionEventTypes.DATA_LOADED, onDataLoaded);
			off(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		};
	}, [on, off, inspection]);

	if (!visible) {
		return null;
	}

	const onLoadDataClicked = async () => {
		if (loading) {
			return;
		}

		setLoading(true);
		validateInspection({
			inspection: inspection ?? (void 0),
			success: inspection => {
				fire(InspectionEventTypes.SAVE_INSPECTION, inspection, (inspection, saved) => {
					if (saved) {
						fire(InspectionEventTypes.REFRESH_DATA, inspection);
					} else {
						setLoading(false);
					}
				});
			},
			fail: reason => {
				let message;
				switch (reason) {
					case InspectionInvalidReason.INDICATOR_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_IS_REQUIRED;
						break;
					case InspectionInvalidReason.AGGREGATE_ARITHMETIC_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.AGGREGATE_ARITHMETIC_IS_REQUIRED;
						break;
					case InspectionInvalidReason.MEASURE_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_IS_REQUIRED;
						break;
					case InspectionInvalidReason.MEASURE_ON_TIME_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_ON_TIME_IS_REQUIRED;
						break;
					case InspectionInvalidReason.INDICATOR_BUCKET_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_BUCKET_IS_REQUIRED;
						break;
					case InspectionInvalidReason.MEASURE_BUCKET_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_BUCKET_IS_REQUIRED;
						break;
					case InspectionInvalidReason.NAME_IS_REQUIRED:
						message = Lang.INDICATOR_WORKBENCH.INSPECTION.NAME_IS_REQUIRED;
						break;
				}
				setLoading(false);
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>);
			}
		});
	};
	// const onPrintClicked = () => {
	// 	window.print();
	// }
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
			{loading ? <FontAwesomeIcon icon={ICON_LOADING} spin={true}/> : null}
			{Lang.INDICATOR_WORKBENCH.INSPECTION.REFRESH_DATA}
		</InspectionButton>
		{/*<InspectionButton ink={ButtonInk.PRIMARY} onClick={onPrintClicked}>*/}
		{/*	{Lang.INDICATOR_WORKBENCH.INSPECTION.PRINT}*/}
		{/*</InspectionButton>*/}
		<InspectionButton ink={ButtonInk.DANGER} onClick={onPickAnotherClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_ANOTHER}
		</InspectionButton>
	</ButtonsContainer>;
};