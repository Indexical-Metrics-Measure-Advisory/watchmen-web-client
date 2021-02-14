import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_CLOSE } from '../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { Topic } from '../../../../services/tuples/topic-types';
import { Tuple } from '../../../../services/tuples/tuple-types';
import { isTopic } from '../../../../services/tuples/utils';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { TopicBody } from './topic-body';
import { NavigatorContainer, NavigatorHeader, NavigatorHeaderButton, NavigatorHeaderTitle } from './widgets';

export const Navigator = () => {
	const { on, off } = useCatalogEventBus();
	const [ visible, setVisible ] = useState(false);
	const [ tuple, setTuple ] = useState<Tuple | null>(null);
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setTuple(topic);
			setVisible(true);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		};
	}, [ on, off ]);

	const onCloseClicked = () => {
		setVisible(false);
	};

	let name = '';
	if (tuple == null) {
	} else if (isTopic(tuple)) {
		name = tuple.name;
	}

	return <NavigatorContainer visible={visible}>
		<NavigatorHeader>
			<NavigatorHeaderTitle>{name}</NavigatorHeaderTitle>
			<NavigatorHeaderButton tooltip={{ label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT }}
			                       onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</NavigatorHeaderButton>
		</NavigatorHeader>
		{tuple != null && isTopic(tuple)
			? <TopicBody topic={tuple}/>
			: null}
	</NavigatorContainer>;
};