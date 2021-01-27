import { Space } from '../tuples/space-types';
import { Topic } from '../tuples/topic-types';
import { ConnectedSpace } from './connected-space-types';
import { Dashboard } from './dashboard-types';
import { Favorite } from './favorite-types';

export type AvailableSpaceInConsole = Pick<Space, 'spaceId' | 'name' | 'description' | 'topicIds'>;

export interface ConsoleSettings {
	connectedSpaces: Array<ConnectedSpace>;
	availableSpaces: Array<AvailableSpaceInConsole>;
	availableTopics: Array<Topic>;
	dashboards: Array<Dashboard>;
	favorite: Favorite;
}