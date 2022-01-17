import {DEMO_CONNECTED_SPACE, DEMO_SPACE, DEMO_TOPIC} from '@/services/data/console/temp-demo';
import {fetchLastSnapshot} from '../account/last-snapshot';
import {fetchConnectedSpaceGraphics, fetchConnectedSpaces} from '../tuples/connected-space';
import {fetchDashboards} from '../tuples/dashboard';
import {TopicId} from '../tuples/topic-types';
import {fetchAvailableSpaces} from './available-space';
import {fetchAvailableTopics} from './available-topic';
import {fetchFavorite} from './favorite';
import {ConsoleSettings} from './settings-types';

export const fetchConsoleSettingsData = async (): Promise<ConsoleSettings> => {
	const [
		connectedSpaces, connectedSpaceGraphics, dashboards,
		availableSpaces,
		favorite, lastSnapshot
	] = await Promise.all([
		fetchConnectedSpaces(),
		fetchConnectedSpaceGraphics(),
		fetchDashboards(),
		fetchAvailableSpaces(),
		fetchFavorite(), fetchLastSnapshot()
	]);

	// @ts-ignore
	const topicIds = availableSpaces.reduce<Array<TopicId>>((topicIds, space) => ([...topicIds, ...space.topicIds]), []);
	const availableTopics = await fetchAvailableTopics(topicIds);

	// @ts-ignore
	return {
		connectedSpaces: [...connectedSpaces, DEMO_CONNECTED_SPACE],
		connectedSpaceGraphics, dashboards,
		availableSpaces: [...availableSpaces, DEMO_SPACE],
		availableTopics: [...availableTopics, DEMO_TOPIC],
		favorite, lastSnapshot
	};
};