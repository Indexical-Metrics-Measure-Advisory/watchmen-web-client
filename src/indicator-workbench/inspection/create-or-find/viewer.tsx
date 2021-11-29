import {Inspection} from '@/services/data/tuples/inspection-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionEntityLabel, InspectionLabel} from '../widgets';
import {CreateOrFindContainer} from './widgets';

export const CreateOrFindViewer = () => {
	const {on, off} = useInspectionEventBus();
	const [inspection, setInspection] = useState<Inspection | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			setInspection(inspection);
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off]);

	if (inspection == null) {
		return null;
	}

	const name = isFakedUuid(inspection)
		? Lang.INDICATOR_WORKBENCH.INSPECTION.NONAME_ON_CREATE_INSPECTION
		: (inspection.name || 'Noname Inspection');

	return <CreateOrFindContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.PICKED_INSPECTION_LABEL}</InspectionLabel>
		<InspectionEntityLabel>{name}</InspectionEntityLabel>
	</CreateOrFindContainer>;
};