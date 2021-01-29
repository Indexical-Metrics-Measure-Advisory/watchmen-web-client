import { fetchAvailableSpaces } from './available-space';
import { fetchAvailableTopics } from './available-topic';
import { fetchConnectedSpaces } from '../tuples/connected-space';
import { fetchDashboards } from '../tuples/dashboard';
import { fetchFavorite } from './favorite';
import { fetchLastSnapshot } from './last-snapshot';
import { ConsoleSettings } from './settings-types';

export const fetchConsoleSettingsData = async (): Promise<ConsoleSettings> => {
	const [
		connectedSpaces, dashboards,
		availableSpaces,
		favorite, lastSnapshot
	] = await Promise.all([
		fetchConnectedSpaces(), fetchDashboards(),
		fetchAvailableSpaces(),
		fetchFavorite(), fetchLastSnapshot()
	]);

	const topicIds = availableSpaces.reduce<Array<string>>((topicIds, space) => ([ ...topicIds, ...space.topicIds ]), []);
	const availableTopics = await fetchAvailableTopics(topicIds);

	return {
		connectedSpaces, dashboards,
		availableSpaces, availableTopics,
		favorite, lastSnapshot
	};
};