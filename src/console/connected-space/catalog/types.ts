import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpaceBlockGraphics} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum GraphicsRole {
	TOPIC = 'topic',
	TOPIC_FRAME = 'topic-frame',
	TOPIC_NAME = 'topic-name',

	SUBJECT = 'subject',
	SUBJECT_FRAME = 'subject-frame',
	SUBJECT_NAME = 'subject-name',

	REPORT = 'report',
	REPORT_FRAME = 'report-frame',
	REPORT_NAME = 'report-name',

	BLOCK_SELECTION = 'block-selection',

	SUBJECT_TOPIC_RELATION = 'subject-topic-relation',
	SUBJECT_TOPIC_RELATION_LINK = 'subject-topic-relation-link',
	SUBJECT_TOPIC_RELATION_ANIMATION = 'subject-topic-relation-animation',

	REPORT_SUBJECT_RELATION = 'report-subject-relation',
	REPORT_SUBJECT_RELATION_LINK = 'report-subject-relation-link',
	REPORT_SUBJECT_RELATION_ANIMATION = 'report-subject-relation-animation'
}

export interface AssembledTopicGraphics extends ConnectedSpaceBlockGraphics {
	topic: Topic;
}

export interface AssembledSubjectGraphics extends ConnectedSpaceBlockGraphics {
	subject: Subject,
}

export interface AssembledReportGraphics extends ConnectedSpaceBlockGraphics {
	report: Report;
}

export interface AssembledConnectedSpaceGraphics {
	topics: Array<AssembledTopicGraphics>;
	subjects: Array<AssembledSubjectGraphics>;
	reports: Array<AssembledReportGraphics>;
}

export interface CatalogData {
	initialized: boolean;
	space?: AvailableSpaceInConsole;
	topics: Array<Topic>;
	graphics?: AssembledConnectedSpaceGraphics;
}
