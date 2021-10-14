import {
	MappingRow,
	WriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_ADD} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {createMapping} from '../../../../data-utils';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {FactorMapping} from './factor-mapping';
import {useFactorsMappingEventBus} from './factors-mapping-event-bus';
import {FactorsMappingEventTypes} from './factors-mapping-event-bus-types';
import {AddFactorButton, FactorsMappingContainer} from './widgets';

export const Factors = (props: { action: WriteTopicAction & MappingRow, topics: Array<Topic>, topic: Topic }) => {
	const {action, topics, topic} = props;

	const {on: onAction, off: offAction, fire: fireAction} = useActionEventBus();
	const {on, off, fire} = useFactorsMappingEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onMappingAdded = () => {
			forceUpdate();
			fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		};
		const onMappingRemoved = () => {
			forceUpdate();
			fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		};
		const onMappingChanged = () => {
			fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		};
		onAction(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
		on(FactorsMappingEventTypes.MAPPING_ADDED, onMappingAdded);
		on(FactorsMappingEventTypes.MAPPING_REMOVED, onMappingRemoved);
		on(FactorsMappingEventTypes.MAPPING_CHANGED, onMappingChanged);
		return () => {
			offAction(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
			off(FactorsMappingEventTypes.MAPPING_ADDED, onMappingAdded);
			off(FactorsMappingEventTypes.MAPPING_REMOVED, onMappingRemoved);
			off(FactorsMappingEventTypes.MAPPING_CHANGED, onMappingChanged);
		};
	}, [onAction, offAction, fireAction, on, off, forceUpdate, action]);

	let targetTopic: Topic | undefined = (void 0);
	const {topicId} = action;
	if (topicId) {
		// eslint-disable-next-line
		targetTopic = topics.find(topic => topic.topicId == topicId);
	}

	const onAddMappingClicked = () => {
		const newMapping = createMapping();
		action.mapping.push(newMapping);
		fire(FactorsMappingEventTypes.MAPPING_ADDED, newMapping);
	};

	return <FactorsMappingContainer>
		{action.mapping.map(mapping => {
			return <FactorMapping action={action} mapping={mapping} source={topic} target={targetTopic}
			                      key={v4()}/>;
		})}
		<AddFactorButton onClick={onAddMappingClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>Add Factor Mapping</span>
		</AddFactorButton>
	</FactorsMappingContainer>;
};