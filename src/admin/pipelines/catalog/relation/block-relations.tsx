import { v4 } from 'uuid';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { asTopicGraphicsMap } from '../graphics-utils';
import { AssembledPipelinesGraphics } from '../types';
import { computeRelatedTopicIds } from '../utils/data-utils';
import { TopicsRelation } from './topics-relation';

export const BlockRelations = (props: {
	pipelines: Array<Pipeline>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const { pipelines, graphics } = props;

	const topicsMap = asTopicGraphicsMap(graphics);

	return <>
		{pipelines.map(pipeline => {
			return computeRelatedTopicIds(pipeline).map(({ source: sourceTopicId, target: targetTopicId }) => {
				const { topic: source } = topicsMap.get(sourceTopicId) || {};
				const { topic: target } = topicsMap.get(targetTopicId) || {};
				if (!source || !target) {
					return null;
				}
				return <TopicsRelation graphics={graphics}
				                       source={source} target={target}
				                       key={v4()}/>;
			});
		}).flat().filter(x => !!x)}
	</>;
};