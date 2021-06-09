export enum RuleGrade {
	GLOBAL = 'global',
	TOPIC = 'topic',
	FACTOR = 'factor'
}

export interface RulesCriteria {
	grade: RuleGrade;
	topicId?: string;
	enabled?: boolean;
}
