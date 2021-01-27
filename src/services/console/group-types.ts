import { Subject } from './subject-types';

export interface Group {
	groupId: string;
	name: string;
	subjects: Array<Subject>;
	createTime: string;
	lastModifyTime: string;
}
