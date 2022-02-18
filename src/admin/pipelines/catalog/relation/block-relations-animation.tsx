import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {v4} from 'uuid';
import {asTopicGraphicsMap} from '../graphics-utils';
import {AssembledPipelinesGraphics} from '../types';
import {computeWriteFlowTopicIds} from '../utils/data-utils';
import {TopicsRelationAnimation} from './topics-relation-animation';

export const BlockRelationsAnimation = (props: {
	pipelines: Array<Pipeline>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const {pipelines, graphics} = props;

	const topicsMap = asTopicGraphicsMap(graphics);

	return <>
		{pipelines.map(pipeline => {
			return computeWriteFlowTopicIds(pipeline).map(({source: sourceTopicId, target: targetTopicId}) => {
				const {topic: source} = topicsMap.get(sourceTopicId) || {};
				const {topic: target} = topicsMap.get(targetTopicId) || {};
				if (!source || !target) {
					return null;
				}
				return <TopicsRelationAnimation graphics={graphics}
				                                source={source} target={target}
				                                key={v4()}/>;
			});
		}).flat().filter(x => !!x)}
	</>;
};