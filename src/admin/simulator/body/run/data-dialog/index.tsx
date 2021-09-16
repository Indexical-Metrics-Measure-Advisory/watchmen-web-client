import {DialogBodyContent, DialogHeader, DialogTitle} from './widgets';
import React from 'react';
import {DialogBody, DialogFooter} from '@/dialog/widgets';
import {Button} from '@/basic-widgets/button';
import {ButtonInk} from '@/basic-widgets/types';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {TopicsData} from '../../state/types';
import {Topic} from '@/services/tuples/topic-types';
import {TriggerData} from './trigger-data';
import {AllTopics, ChangedDataRow} from '../types';
import {AllData} from './all-data';
import {ChangedData} from './changed-data';
import {DataRow} from '../../../types';

export const DataDialog = (props: {
	title: string;
	triggerData?: {
		topic: Topic;
		oldOne?: DataRow;
		newOne: DataRow
	}
	allTopics: AllTopics;
	beforeData: TopicsData;
	afterData?: TopicsData;
	changedData?: Array<ChangedDataRow>;
	buttons?: Array<{ label: string, ink?: ButtonInk, action: () => void }>
}) => {
	const {title, triggerData, allTopics, beforeData, afterData = {}, changedData, buttons = []} = props;

	const {fire} = useEventBus();

	const onCloseClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	// if data changed, then display whole data of this topic
	// ignore the unchanged data
	let afterChangedData: TopicsData = afterData;
	if (changedData) {
		afterChangedData = Object.keys(afterData).reduce((after, topicId) => {
			// eslint-disable-next-line
			if (changedData.some(({topicId: id}) => topicId == id)) {
				after[topicId] = afterData[topicId];
			}
			return after;
		}, {} as TopicsData);
	}
	afterChangedData = afterChangedData ?? {};

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<DialogBodyContent>
				<div>
					{triggerData != null
						?
						<TriggerData topic={triggerData.topic} newOne={triggerData.newOne} oldOne={triggerData.oldOne}/>
						: null
					}
					<AllData topics={allTopics} data={beforeData} before={true}/>
					{(changedData || []).length !== 0
						? <ChangedData topics={allTopics} data={changedData || []}/>
						: null
					}
					<AllData topics={allTopics} data={afterChangedData} before={false}/>
				</div>
			</DialogBodyContent>
		</DialogBody>
		<DialogFooter>
			{buttons.map(button => {
				return <Button ink={button.ink} onClick={button.action} key={button.label}>
					{button.label}
				</Button>;
			})}
			<Button ink={ButtonInk.PRIMARY} onClick={onCloseClicked}>Close</Button>
		</DialogFooter>
	</>;
};