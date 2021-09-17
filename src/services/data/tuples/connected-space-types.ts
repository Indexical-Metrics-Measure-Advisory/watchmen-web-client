import {BlockCoordinate, BlockFrame, BlockName} from '../graphics/graphics-types';
import {Subject} from './subject-types';
import {Tuple} from './tuple-types';

export interface ConnectedSpace extends Tuple {
	connectId: string;
	name: string;
	spaceId: string;
	subjects: Array<Subject>;
	isTemplate: boolean;
	lastVisitTime: string;
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
	topicId: string;
}

export interface SubjectGraphics extends ConnectedSpaceBlockGraphics {
	subjectId: string;
}

export interface ReportGraphics extends ConnectedSpaceBlockGraphics {
	reportId: string;
}

export interface ConnectedSpaceGraphics {
	connectId: string;
	topics: Array<TopicGraphics>;
	subjects: Array<SubjectGraphics>;
	reports: Array<ReportGraphics>;
}

export interface ConnectedSpaceTemplate {
	connectId: string;
	name: string;
	createBy: string;
}