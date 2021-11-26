import {fetchInspection, listInspections} from '@/services/data/tuples/inspection';
import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionButton, InspectionDropdown, InspectionLabel, OrLabel} from '../widgets';
import {CreateOrFindContainer} from './widgets';

export const CreateOrFind = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useInspectionEventBus();
	const [shown, setShown] = useState(true);
	const [selectedInspectionId, setSelectedInspectionId] = useState<InspectionId | null>(null);
	const [inspections, setInspections] = useState<Array<QueryInspection>>([]);
	useEffect(() => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await listInspections(),
			(inspections: Array<QueryInspection>) => {
				setInspections(inspections.sort((i1, i2) => {
					return (i1.name || '').localeCompare(i2.name || '', void 0, {
						sensitivity: 'base',
						caseFirst: 'upper'
					});
				}));
			});
	}, [fireGlobal]);

	if (!shown) {
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

		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => fetchInspection(selectedInspectionId),
			(inspection: Inspection) => {
				fire(InspectionEventTypes.INSPECTION_PICKED, inspection);
				setShown(false);
			});
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
		<InspectionButton ink={ButtonInk.PRIMARY}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.CREATE_INSPECTION}
		</InspectionButton>
	</CreateOrFindContainer>;
};