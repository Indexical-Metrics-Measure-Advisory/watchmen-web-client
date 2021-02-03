import { Tuple } from './tuple-types';

export interface Subject extends Tuple {
	subjectId: string;
	name: string;
	lastVisitTime: string;
	// dataset?: {
	// 	filters?: Array<ConsoleSpaceSubjectDataSetFilter>;
	// 	columns?: Array<ConsoleSpaceSubjectDataSetColumn>;
	// 	joins?: Array<ConsoleSpaceSubjectDataSetJoin>;
	// };
	// graphics?: Array<ConsoleSpaceSubjectChart>;
}
