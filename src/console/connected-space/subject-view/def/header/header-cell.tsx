import React, { useEffect, useState } from 'react';
import { AlertLabel } from '../../../../../alert/widgets';
import { ButtonInk } from '../../../../../basic-widgets/types';
import { useEventBus } from '../../../../../events/event-bus';
import { EventTypes } from '../../../../../events/types';
import { Lang } from '../../../../../langs';
import { Topic } from '../../../../../services/tuples/topic-types';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefData, SubjectDefEventTypes } from '../subject-def-event-bus-types';
import { DefHeaderCell, DefHeaderIndex, DefHeaderLabel, DefHeaderNextButton } from './widgets';

export const HeaderCell = (props: {
	active: boolean;
	activeIndex: number;
	label: string;
	onClick: (activeIndex: number) => void;
	checkPickedTopicBeforeActive?: boolean;
	next?: boolean;
	checkPickedTopicBeforeNext?: boolean;
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
}) => {
	const {
		activeIndex, label, onClick,
		checkPickedTopicBeforeActive = true,
		next = true, checkPickedTopicBeforeNext = false,
		children
	} = props;

	const { fire: fireGlobal } = useEventBus();
	const { on, off } = useSubjectDefEventBus();
	const [ pickedTopics, setPickedTopics ] = useState<Array<Topic>>([]);
	useEffect(() => {
		const onAvailableTopicsLoaded = ({ pickedTopics }: SubjectDefData) => {
			setPickedTopics(pickedTopics);
		};
		const onTopicPicked = (topic: Topic) => {
			setPickedTopics(pickedTopics => Array.from(new Set([ ...pickedTopics, topic ])));
		};
		const onTopicUnpicked = (topic: Topic) => {
			setPickedTopics(pickedTopics => pickedTopics.filter(exists => exists !== topic));
		};
		on(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
		on(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
		on(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		return () => {
			off(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
			off(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
			off(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		};
	}, [ on, off ]);

	const onClicked = () => {
		if (checkPickedTopicBeforeActive && pickedTopics.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.NO_PICKED_TOPIC_FOR_SUBJECT}</AlertLabel>);
		} else {
			onClick(activeIndex);
		}
	};
	const onNextClicked = () => {
		if (checkPickedTopicBeforeNext && pickedTopics.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.NO_PICKED_TOPIC_FOR_SUBJECT}</AlertLabel>);
		} else {
			onClick(activeIndex + 1);
		}
	};

	return <DefHeaderCell onClick={onClicked}>
		<DefHeaderIndex>{activeIndex}</DefHeaderIndex>
		<DefHeaderLabel>{label}</DefHeaderLabel>
		{children}
		{next
			? <DefHeaderNextButton ink={ButtonInk.SUCCESS} onClick={onNextClicked}>
				<span>{Lang.ACTIONS.NEXT}</span>
			</DefHeaderNextButton>
			: null}
	</DefHeaderCell>;
};