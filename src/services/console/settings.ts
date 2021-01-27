import { fetchAvailableSpaces } from './available-space';
import { fetchAvailableTopics } from './available-topic';
import { fetchConnectedSpaces } from './connected-space';
import { fetchDashboards } from './dashboard';
import { fetchFavorite } from './favorite';
import { ConsoleSettings } from './settings-types';

export const fetchConsoleSettingsData = async (): Promise<ConsoleSettings> => {
	const [
		connectedSpaces, availableSpaces,
		favorite, dashboards
	] = await Promise.all([
		fetchConnectedSpaces(), fetchAvailableSpaces(),
		fetchFavorite(), fetchDashboards()
	]);

	const topicIds = availableSpaces.reduce<Array<string>>((topicIds, space) => ([ ...topicIds, ...space.topicIds ]), []);
	const availableTopics = await fetchAvailableTopics(topicIds);

	return { connectedSpaces, availableSpaces, availableTopics, favorite, dashboards };
};