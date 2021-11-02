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
		connectedSpaces, connectedSpaceGraphics, dashboards,
		availableSpaces, availableTopics,
		favorite, lastSnapshot
	};
};