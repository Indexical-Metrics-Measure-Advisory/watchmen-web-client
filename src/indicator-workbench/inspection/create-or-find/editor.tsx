import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {createInspection} from '../utils';
import {InspectionButton, InspectionDropdown, InspectionLabel, OrLabel} from '../widgets';
import {CreateOrFindContainer} from './widgets';

export const CreateOrFindEditor = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(true);
	const [selectedInspectionId, setSelectedInspectionId] = useState<InspectionId | null>(null);
	const [inspections, setInspections] = useState<Array<QueryInspection>>([]);
	useEffect(() => {
		fire(InspectionEventTypes.ASK_INSPECTIONS, (inspections) => {
			setInspections(inspections);
		});
	}, [fire]);
	useEffect(() => {
		const onInspectionCleared = () => {
			setVisible(true);
			setSelectedInspectionId(null);
		};
		on(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		return () => {
			off(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		};
	}, [on, off]);

	if (!visible) {
		return null;
	}

	const onChange = (option: DropdownOption) => {
		setSelectedInspectionId(option.value as InspectionId);
	};
	const onViewClicked = () => {
		if (selectedInspectionId == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.INSPECTION_IS_REQUIRED}
			</AlertLabel>);
			return;
		}
		fire(InspectionEventTypes.ASK_INSPECTION, selectedInspectionId, (inspection: Inspection) => {
			fire(InspectionEventTypes.ASK_INDICATOR, inspection.indicatorId, (indicator: IndicatorForInspection) => {
				fire(InspectionEventTypes.INSPECTION_PICKED, inspection, indicator);
				setVisible(false);
			});
		});
	};
	const onCreateClicked = () => {
		const inspection = createInspection();
		fire(InspectionEventTypes.INSPECTION_PICKED, inspection);
		setVisible(false);
	};

	const options = inspections.map(inspection => {
		return {
			value: inspection.inspectionId,
			label: inspection.name || 'Noname Inspection'
		};
	});

	return <CreateOrFindContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INSPECTION_LABEL}</InspectionLabel>
		<InspectionDropdown value={selectedInspectionId} options={options} onChange={onChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<InspectionButton ink={ButtonInk.PRIMARY} onClick={onViewClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INSPECTION}
		</InspectionButton>
		<OrLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.OR}</OrLabel>
		<InspectionButton ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.CREATE_INSPECTION}
		</InspectionButton>
	</CreateOrFindContainer>;
};