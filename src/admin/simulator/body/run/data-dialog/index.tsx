import {DialogHeader, DialogTitle} from './widgets';
import React from 'react';
import {DialogBody, DialogFooter} from '../../../../../dialog/widgets';
import {Button} from '../../../../../basic-widgets/button';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {useEventBus} from '../../../../../events/event-bus';
import {EventTypes} from '../../../../../events/types';
import {DataRow} from '../../../simulator-event-bus-types';
import {TopicsData} from '../../state/types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {TriggerData} from './trigger-data';

export const DataDialog = (props: {
	title: string;
	triggerData?: {
		topic: Topic;
		oldOne?: DataRow;
		newOne: DataRow
	}
	allData: TopicsData;
}) => {
	const {title, triggerData} = props;

	const {fire} = useEventBus();

	const onCloseClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody>
			{triggerData != null
				? <TriggerData topic={triggerData.topic} newOne={triggerData.newOne} oldOne={triggerData.oldOne}/>
				: null
			}
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onCloseClicked}>Close</Button>
		</DialogFooter>
	</>;
};