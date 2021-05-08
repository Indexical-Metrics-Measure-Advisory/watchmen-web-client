import React, {ChangeEvent} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
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
                       placeholder='Noname'/>
    </UnitNameEditor>;

};