import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {v4} from 'uuid';
import {asTopicGraphicsMap} from '../graphics-utils';
import {AssembledPipelinesGraphics} from '../types';
import {computeReadFlowTopicIds, computeWriteFlowTopicIds} from '../utils/data-utils';
import {TopicsRelation} from './topics-relation';

export const BlockRelations = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
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
				return <TopicsRelation graphics={graphics}
				                       source={source} target={target}
				                       key={v4()}/>;
			});
		}).flat().filter(x => !!x)}
		{computeReadFlowTopicIds(pipelines).map(({source: sourceTopicId, target: targetTopicId}) => {
			const {topic: source} = topicsMap.get(sourceTopicId) || {};
			const {topic: target} = topicsMap.get(targetTopicId) || {};
			if (!source || !target) {
				return null;
			}
			return <TopicsRelation graphics={graphics}
			                       source={source} target={target}
			                       read={true}
			                       key={v4()}/>;
		})}
	</>;
};