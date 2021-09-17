import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useUnitEventBus} from '../unit-event-bus';
import {UnitEventTypes} from '../unit-event-bus-types';
import {UnitNameEditor, UnitNameInput, UnitNameLabel} from './widgets';

export const NameEditor = (props: { unit: PipelineStageUnit }) => {
	const {unit} = props;

	const {fire} = useUnitEventBus();
	const forceUpdate = useForceUpdate();

	const onUnitNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === unit.name) {
			return;
		}

		unit.name = value;
		forceUpdate();
		fire(UnitEventTypes.RENAME_UNIT, unit);
	};

	return <UnitNameEditor>
		<UnitNameLabel>{unit.name || 'Noname'}</UnitNameLabel>
		<UnitNameInput value={unit.name || ''} onChange={onUnitNameChanged}
		               placeholder="Noname"/>
	</UnitNameEditor>;

};