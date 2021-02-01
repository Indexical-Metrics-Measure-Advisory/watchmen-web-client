import { Subject } from './subject-types';
import { Tuple } from './tuple-types';

export interface ConnectedSpace extends Tuple {
	connectId: string;
	name: string;
	spaceId: string;
	subjects: Array<Subject>;
	lastVisitTime: string;
}