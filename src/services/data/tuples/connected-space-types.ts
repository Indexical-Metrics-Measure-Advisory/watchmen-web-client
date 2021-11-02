import {BlockCoordinate, BlockFrame, BlockName} from '../graphics/graphics-types';
import {DateTime} from '../types';
import {ReportId} from './report-types';
import {SpaceId} from './space-types';
import {Subject, SubjectId} from './subject-types';
import {TopicId} from './topic-types';
import {Tuple} from './tuple-types';

export interface ConnectedSpace extends Tuple {
	connectId: ConnectedSpaceId;
	name: string;
	spaceId: SpaceId;
	subjects: Array<Subject>;
	isTemplate: boolean;
	lastVisitTime: DateTime;
}

export interface ConnectedSpaceBlockGraphicsRect {
	coordinate: BlockCoordinate;
	frame: BlockFrame;
	name: BlockName;
}

export interface ConnectedSpaceBlockGraphics {
	rect: ConnectedSpaceBlockGraphicsRect;
}

export interface TopicGraphics extends ConnectedSpaceBlockGraphics {
	topicId: TopicId;
}

export interface SubjectGraphics extends ConnectedSpaceBlockGraphics {
	subjectId: SubjectId;
}

export interface ReportGraphics extends ConnectedSpaceBlockGraphics {
	reportId: ReportId;
}

export type ConnectedSpaceId = string;

export interface ConnectedSpaceGraphics {
	connectId: ConnectedSpaceId;
	topics: Array<TopicGraphics>;
	subjects: Array<SubjectGraphics>;
	reports: Array<ReportGraphics>;
}

export interface ConnectedSpaceTemplate {
	connectId: ConnectedSpaceId;
	name: string;
	createBy: string;
}