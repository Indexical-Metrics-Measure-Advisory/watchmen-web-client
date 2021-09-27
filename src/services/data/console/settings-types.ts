import {LastSnapshot} from '../account/last-snapshot-types';
import {ConnectedSpace, ConnectedSpaceGraphics} from '../tuples/connected-space-types';
import {Dashboard} from '../tuples/dashboard-types';
import {Enum} from '../tuples/enum-types';
import {Space} from '../tuples/space-types';
import {Topic} from '../tuples/topic-types';
import {Favorite} from './favorite-types';

export type AvailableSpaceInConsole = Pick<Space, 'spaceId' | 'name' | 'description' | 'topicIds'>;

export interface ConsoleSettings {
	connectedSpaces: Array<ConnectedSpace>;
	connectedSpaceGraphics: Array<ConnectedSpaceGraphics>;
	availableSpaces: Array<AvailableSpaceInConsole>;
	availableTopics: Array<Topic>;
	dashboards: Array<Dashboard>;
	enums: Array<Enum>;
	favorite: Favorite;

	lastSnapshot: LastSnapshot;
}