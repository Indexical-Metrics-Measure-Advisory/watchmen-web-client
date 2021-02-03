import { computeRelatedTopicIds } from '../data-utils';
import { asTopicGraphicsMap } from '../graphics-utils';
import { ConnectedSpaceGraphics } from '../types';
import { SubjectTopicSelection } from './subject-topic-relation';

export const BlockRelations = (props: { graphics: ConnectedSpaceGraphics }) => {
	const { graphics } = props;

	const { subjects: subjectGraphics } = graphics;

	const topicsMap = asTopicGraphicsMap(graphics);

	return <>
		{subjectGraphics.map(({ subject }) => {
			const { dataset } = subject;
			return computeRelatedTopicIds(dataset).map(topicId => {
				const topic = topicsMap.get(topicId);
				if (!topic) {
					return null;
				}
				return <SubjectTopicSelection graphics={graphics}
				                              topic={topic.topic} subject={subject}/>;
			});
		}).flat().filter(x => !!x)}
	</>;
};