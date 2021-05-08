import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useState} from 'react';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '../../../../../../basic-widgets/constants';
import {
    Parameter,
    ParameterComputeType,
    ParameterKind
} from '../../../../../../services/tuples/factor-calculator-types';
import {
    isComputedParameter,
    isConstantParameter,
    isTopicFactorParameter
} from '../../../../../../services/tuples/factor-calculator-utils';
import {createTopicFactorParameter} from '../../../../data-utils';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {ParameterFromEditContainer, ParameterFromIcon, ParameterTypeButton} from './widgets';

const OptionsLabel: { [key in ParameterKind]: string } = {
    [ParameterKind.TOPIC]: 'Topic',
    [ParameterKind.CONSTANT]: 'Constant',
    [ParameterKind.COMPUTED]: 'Compute'
};

const initParameter = (parameter: Parameter) => {
    if (isTopicFactorParameter(parameter)) {
        const old = parameter as any;
        delete old.value;
        delete old.type;
        delete old.parameters;
        old.topicId = old.topicId || '';
        old.factorId = old.factorId || '';
    } else if (isConstantParameter(parameter)) {
        const old = parameter as any;
        delete old.topicId;
        delete old.factorId;
        delete old.type;
        delete old.parameters;
        old.value = old.value || '';
    } else if (isComputedParameter(parameter)) {
        const old = parameter as any;
        delete old.topicId;
        delete old.factorId;
        delete old.value;
        old.type = old.type || ParameterComputeType.ADD;
        old.parameters = old.parameters || [createTopicFactorParameter(), createTopicFactorParameter()];
    }
};

export const ParameterFromEditor = (props: { parameter: Parameter }) => {
    const {parameter} = props;

    const {fire} = useParameterEventBus();
    const [editing, setEditing] = useState(false);

    const onStartEditing = () => setEditing(true);
    const onBlur = () => setEditing(false);
    const onFromChange = (from: ParameterKind) => (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (from === parameter.kind) {
            // do nothing, discard or start editing
            setEditing(!editing);
        } else {
            parameter.kind = from;
            initParameter(parameter);
            setEditing(false);
            fire(ParameterEventTypes.FROM_CHANGED, parameter);
        }
    };
    const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setEditing(!editing);
    };

    const candidates = [ParameterKind.TOPIC, ParameterKind.CONSTANT, ParameterKind.COMPUTED].filter(candidate => candidate !== parameter.kind);

    return <ParameterFromEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur}>
        <ParameterTypeButton active={true} edit={editing}
                             onClick={onFromChange(parameter.kind)}>
            From {OptionsLabel[parameter.kind]}
        </ParameterTypeButton>
        {candidates.map(candidate => {
            return <ParameterTypeButton active={false} edit={editing}
                                        onClick={onFromChange(candidate)}
                                        key={candidate}>
                {OptionsLabel[candidate]}
            </ParameterTypeButton>;
        })}
        <ParameterFromIcon onClick={onIconClicked} data-expanded={editing}>
            {editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
        </ParameterFromIcon>
    </ParameterFromEditContainer>;
};
