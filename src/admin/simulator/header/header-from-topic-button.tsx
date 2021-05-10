import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_TOPIC} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {useEventBus} from '../../../events/event-bus';
import {useCacheEventBus} from '../../cache/cache-event-bus';
import {useSimulatorEventBus} from '../simulator-event-bus';
import {SimulatorEventTypes} from '../simulator-event-bus-types';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {AdminCacheData} from '../../../local-persist/types';
import {EventTypes} from '../../../events/types';
import {TupleSwitch} from './switch-dialog';
import {DropdownOption} from '../../../basic-widgets/types';
import {Topic} from '../../../services/tuples/topic-types';
import {getTopicName} from '../utils';

const toOption = (topic: Topic) => {
	return {
		value: topic,
		label: (option: DropdownOption) => {
			const t = option.value as Topic;
			return {
				node: getTopicName(t),
				label: getTopicName(t)
			};
		},
		key: (option: DropdownOption) => (option.value as Topic).topicId
	};
};

export const HeaderFromTopicButton = () => {
	const {fire} = useEventBus();
	const {once: onceCache} = useCacheEventBus();
	const {fire: fireSimulator} = useSimulatorEventBus();
	const onSelected = (topic: Topic) => {
		fireSimulator(SimulatorEventTypes.START_TOPIC, topic);
	};
	const doSelectTopic = () => {
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const candidates = (data?.topics || []).sort((a, b) => {
				if (!a.name) {
					return b.name ? 1 : a.topicId.localeCompare(b.topicId);
				} else if (!b.name) {
					return a.name ? -1 : a.topicId.localeCompare(b.topicId);
				} else {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}
			});
			fire(EventTypes.SHOW_DIALOG,
				<TupleSwitch candidates={candidates} toOption={toOption}
				             switchTo={onSelected}
				             label="Please select a topic to start:"/>);
		}).fire(AdminCacheEventTypes.ASK_DATA);

	};
	const onClicked = () => {
		const ask = () => {
			onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded: boolean) => {
				if (loaded) {
					doSelectTopic();
				} else {
					setTimeout(() => ask(), 100);
				}
			}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
		};
		ask();
	};

	return <PageHeaderButton tooltip="Starts from Topic" onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_TOPIC}/>
	</PageHeaderButton>;
};