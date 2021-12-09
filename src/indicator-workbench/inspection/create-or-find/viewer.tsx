import {Inspection} from '@/services/data/tuples/inspection-types';
import {Button} from '@/widgets/basic/button';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {DialogBody, DialogFooter, DialogHeader, DialogTitle} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionButton, InspectionEntityLabel, InspectionInput, InspectionLabel} from '../widgets';
import {CreateOrFindContainer} from './widgets';

const NameInput = styled(InspectionInput)`
	padding : 0;
	width   : 100%;
`;
const ErrorLabel = styled(InspectionLabel)`
	color      : var(--danger-color);
	opacity    : 1;
	transition : opacity 300ms ease-in-out;
	&:empty {
		opacity : 0;
	}
	&:not(:empty) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;

const NameDialog = (props: { inspection: Inspection; onNamed: () => void; }) => {
	const {inspection, onNamed} = props;

	const {fire} = useEventBus();
	const [name, setName] = useState(inspection.name ?? '');
	const [error, setError] = useState('');

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setName(value);
		if (value.trim().length !== 0) {
			setError('');
		}
	};
	const onConfirmClicked = () => {
		if (name.trim().length === 0) {
			setError(Lang.INDICATOR_WORKBENCH.INSPECTION.NAME_IS_REQUIRED);
			return;
		}

		inspection.name = name.trim();
		onNamed();
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DialogHeader>
			<DialogTitle>{Lang.INDICATOR_WORKBENCH.INSPECTION.SET_NAME_LABEL}</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<NameInput value={name} onChange={onNameChanged}/>
			<ErrorLabel>{error}</ErrorLabel>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const CreateOrFindViewer = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			setInspection(inspection);
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off]);
	useEffect(() => {
		const onIndicatorPicked = () => {
			forceUpdate();
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, forceUpdate]);
	useEffect(() => {
		const onInspectionCleared = () => {
			setInspection(null);
		};
		on(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		return () => {
			off(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		};
	}, [on, off]);

	if (inspection == null) {
		return null;
	}

	const onNamed = () => {
		fire(InspectionEventTypes.SAVE_INSPECTION, inspection, () => {
			fireGlobal(EventTypes.HIDE_DIALOG);
		});
	};
	const onRenameClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG, <NameDialog inspection={inspection} onNamed={onNamed}/>);
	};

	const name = inspection.name || Lang.INDICATOR_WORKBENCH.INSPECTION.NONAME_ON_INSPECTION;
	const hasName = !!inspection.name;
	const canSetName = !!inspection.indicatorId;

	return <CreateOrFindContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.PICKED_INSPECTION_LABEL}</InspectionLabel>
		<InspectionEntityLabel>{name}</InspectionEntityLabel>
		{canSetName
			? <InspectionButton ink={ButtonInk.PRIMARY} onClick={onRenameClicked} data-hide-on-print={true}>
				{hasName ? Lang.INDICATOR_WORKBENCH.INSPECTION.RENAME : Lang.INDICATOR_WORKBENCH.INSPECTION.NEW_NAME}
			</InspectionButton>
			: null}
	</CreateOrFindContainer>;
};