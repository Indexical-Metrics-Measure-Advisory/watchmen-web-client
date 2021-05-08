import {computeRelatedTopicIds} from '../../subject-data-utils';
import {asTopicGraphicsMap} from '../graphics-utils';
import {AssembledConnectedSpaceGraphics} from '../types';
import {ReportSubjectRelationAnimation} from './report-subject-relation-animation';
import {SubjectTopicRelationAnimation} from './subject-topic-relation-animation';

export const BlockRelationsAnimation = (props: { graphics: AssembledConnectedSpaceGraphics }) => {
	const {graphics} = props;

	const {subjects: subjectGraphics} = graphics;

	const topicsMap = asTopicGraphicsMap(graphics);

	return <>
		{subjectGraphics.map(({subject}) => {
			const {dataset} = subject;
			return computeRelatedTopicIds(dataset).map(topicId => {
				const {topic} = topicsMap.get(topicId) || {};
				if (!topic) {
					return null;
				}
				return <SubjectTopicRelationAnimation graphics={graphics}
				                                      topic={topic} subject={subject}
				                                      key={`${topic.topicId}-${subject.subjectId}`}/>;
			});
		}).flat().filter(x => !!x)}
		{subjectGraphics.map(({subject}) => {
			const {reports} = subject;
			if (!reports) {
				return null;
			}
			return reports.map(report => {
				return <ReportSubjectRelationAnimation graphics={graphics}
				                                       subject={subject} report={report}
				                                       key={`${subject.subjectId}-${report.reportId}`}/>;
			});
		}).flat().filter(x => !!x)}
	</>;
};