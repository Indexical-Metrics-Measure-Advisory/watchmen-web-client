import {ConnectedSpace, ConnectedSpaceGraphics} from '../tuples/connected-space-types';
import {Dashboard} from '../tuples/dashboard-types';
import {Space} from '../tuples/space-types';
import {Topic} from '../tuples/topic-types';
import {Favorite} from './favorite-types';
import {LastSnapshot} from '../account/last-snapshot-types';

export type AvailableSpaceInConsole = Pick<Space, 'spaceId' | 'name' | 'description' | 'topicIds'>;

export interface ConsoleSettings {
	connectedSpaces: Array<ConnectedSpace>;
	connectedSpaceGraphics: Array<ConnectedSpaceGraphics>;
	availableSpaces: Array<AvailableSpaceInConsole>;
	availableTopics: Array<Topic>;
	dashboards: Array<Dashboard>;
	favorite: Favorite;

	lastSnapshot: LastSnapshot
}