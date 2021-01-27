export interface Subject {
	subjectId: string;
	name: string;
	lastVisitTime: string;
	createTime: string;
	lastModifyTime: string;
	// dataset?: {
	// 	filters?: Array<ConsoleSpaceSubjectDataSetFilter>;
	// 	columns?: Array<ConsoleSpaceSubjectDataSetColumn>;
	// 	joins?: Array<ConsoleSpaceSubjectDataSetJoin>;
	// };
	// graphics?: Array<ConsoleSpaceSubjectChart>;
}
