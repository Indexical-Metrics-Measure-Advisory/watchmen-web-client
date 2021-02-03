import { computeRelatedTopicIds } from '../data-utils';
import { asTopicGraphicsMap } from '../graphics-utils';
import { ConnectedSpaceGraphics } from '../types';
import { SubjectTopicRelationAnimation } from './subject-topic-relation-animation';

export const BlockRelationsAnimation = (props: { graphics: ConnectedSpaceGraphics }) => {
	const { graphics } = props;

	const { subjects: subjectGraphics } = graphics;

	const topicsMap = asTopicGraphicsMap(graphics);

	return <>
		{subjectGraphics.map(({ subject }) => {
			const { dataset } = subject;
			return computeRelatedTopicIds(dataset).map(topicId => {
				const { topic } = topicsMap.get(topicId) || {};
				if (!topic) {
					return null;
				}
				return <SubjectTopicRelationAnimation graphics={graphics}
				                                      topic={topic} subject={subject}
				                                      key={`${topic.topicId}-${subject.subjectId}`}/>;
			});
		}).flat().filter(x => !!x)}
	</>;
};