import { Group } from './group-types';
import { Subject } from './subject-types';

export interface ConnectedSpace {
	connectId: string;
	name: string;
	spaceId: string;
	groups: Array<Group>;
	subjects: Array<Subject>;
	lastVisitTime: string;
	createTime: string;
	lastModifyTime: string;
}