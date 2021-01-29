import { Tuple } from './tuple-types';
import { Subject } from './subject-types';

export interface SubjectGroup extends Tuple {
	groupId: string;
	name: string;
	subjects: Array<Subject>;
}
