import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { AlertLabel } from '../../../../../alert/widgets';
import { ICON_ADD, ICON_DELETE } from '../../../../../basic-widgets/constants';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { useEventBus } from '../../../../../events/event-bus';
import { EventTypes } from '../../../../../events/types';
import { Lang } from '../../../../../langs';
import { ComputedParameter, Parameter, ParameterFrom } from '../../../../../services/tuples/factor-calculator-types';
import { isComputedParameter } from '../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../services/tuples/topic-types';
import { canAddMoreParameter, canDeleteAnyParameter, createTopicFactorParameter } from '../data-utils';
import {
	ComputedEditor,
	ConstantValueEditor,
	DeleteMeButton,
	ParameterTypeEditor,
	TopicFactorEditor
} from './composite-widgets';
import { ParameterComputeTypeEdit } from './parameter-compute-type-edit';
import { ParameterEventBusProvider, useParameterEventBus } from './parameter-event-bus';
import { ParameterEventTypes } from './parameter-event-bus-types';
import {
	ComputedEditBodyContainer,
	ComputedEditContainer,
	ParameterAddButton,
	ParameterAddContainer,
	ParameterEditContainer
} from './widgets';

/**
 * gather all changes in parameter, and notify to parent
 */
const ParameterEventBridge = (props: { notifyChangeToParent: () => void }) => {
	const { notifyChangeToParent } = props;
	const { on, off } = useParameterEventBus();
	useEffect(() => {
		const onParamChanged = () => notifyChangeToParent();
		on(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		};
	}, [ on, off, notifyChangeToParent ]);

	return <></>;
};

const ParameterEditContent = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {
		availableTopics, pickedTopics,
		parameter, parentParameter,
		onDeleted
	} = props;

	const { fire: fireGlobal } = useEventBus();

	const onDeleteClicked = () => {
		const canDelete = canDeleteAnyParameter(parentParameter);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_DELETE_CHILD_FROM_COMPUTED}</AlertLabel>);
		} else {
			const index = parentParameter.parameters.findIndex(child => child === parameter);
			if (index !== -1) {
				parentParameter.parameters.splice(index, 1);
				onDeleted();
			}
		}
	};

	return <>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<DeleteMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</DeleteMeButton>
		<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</>;

};
const ParameterEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {
		availableTopics, pickedTopics,
		parameter, parentParameter,
		onDeleted
	} = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <ParameterEditContainer shorten={parameter.from === ParameterFrom.COMPUTED}>
		<ParameterTypeEditor parameter={parameter}/>
		<ParameterEditContent parameter={parameter} parentParameter={parentParameter}
		                      availableTopics={availableTopics} pickedTopics={pickedTopics}
		                      onDeleted={onDeleted}/>
	</ParameterEditContainer>;
};

const ParameterAdd = (props: {
	parentParameter: ComputedParameter;
	onAdded: (parameter: Parameter) => void;
}) => {
	const { parentParameter, onAdded } = props;

	const { fire: fireGlobal } = useEventBus();

	const canAdd = canAddMoreParameter(parentParameter);
	if (!canAdd) {
		return null;
	}

	const onAddClicked = () => {
		const canAdd = canAddMoreParameter(parentParameter);
		if (!canAdd) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_ADD_CHILD_INTO_COMPUTED}</AlertLabel>);
		} else {
			const parameter = createTopicFactorParameter();
			parentParameter.parameters.push(parameter);
			onAdded(parameter);
		}
	};

	return <ParameterAddContainer>
		<ParameterAddButton onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_COMPUTE_PARAMETER}</span>
		</ParameterAddButton>
	</ParameterAddContainer>;
};

const ComputedEditBody = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: ComputedParameter;
	notifyChangeToParent: () => void;
}) => {
	const { availableTopics, pickedTopics, parameter, notifyChangeToParent } = props;

	const { on, off, fire } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		return () => {
			off(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <ComputedEditBodyContainer>
		{parameter.parameters.map(sub => {
			return <ParameterEventBusProvider key={v4()}>
				<ParameterEventBridge notifyChangeToParent={notifyChangeToParent}/>
				<ParameterEdit parameter={sub} parentParameter={parameter}
				               availableTopics={availableTopics} pickedTopics={pickedTopics}
				               onDeleted={() => fire(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, sub)}/>
			</ParameterEventBusProvider>;
		})}
		<ParameterAdd parentParameter={parameter}
		              onAdded={(parameter: Parameter) => fire(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, parameter)}/>
	</ComputedEditBodyContainer>;
};

const ComputedContainer = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: ComputedParameter;
}) => {
	const { availableTopics, pickedTopics, parameter } = props;

	const { on, off, fire } = useParameterEventBus();
	useEffect(() => {
		const onComputeChanged = (param: Parameter) => {
			if (param !== parameter) {
				// my children, proxy to my content change event and fire
				fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter);
			}
		};
		on(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		return () => {
			off(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		};
	}, [ on, off, fire, parameter ]);

	return <>
		<ParameterComputeTypeEdit parameter={parameter}/>
		<ComputedEditBody parameter={parameter}
		                  availableTopics={availableTopics} pickedTopics={pickedTopics}
		                  notifyChangeToParent={() => fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter)}/>
	</>;
};

export const ComputedEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter
}) => {
	const { availableTopics, pickedTopics, parameter, ...rest } = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <ComputedEditContainer {...rest}>
		<ComputedContainer parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</ComputedEditContainer>;
};