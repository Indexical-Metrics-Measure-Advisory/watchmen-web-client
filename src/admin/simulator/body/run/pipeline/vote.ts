import {
	isReadTopicAction,
	isWriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {TopicId} from '@/services/data/tuples/topic-types';

interface PipelineIO {
	pipeline: Pipeline;
	read: Array<TopicId>;
	write: Array<TopicId>;
	trails: Array<Pipeline>;
}

const findNextTrails = (from: PipelineIO, breakOut: Pipeline, ioMap: Map<string, PipelineIO>): Array<Pipeline> => {
	return from.trails.map(trail => {
		const nextTrails = ioMap.get(trail.pipelineId)!.trails;
		if (nextTrails.length === 0) {
			return [];
		} else {
			return nextTrails.filter(x => x !== breakOut)
				.map(trail => ioMap.get(trail.pipelineId)!)
				.map(io => findNextTrails(io, breakOut, ioMap))
				.flat();
		}
	}).flat();
};
export const voteNextDynamicPipeline = (options: {
	candidates: Array<Pipeline>;
	allPipelines: Array<Pipeline>;
}): Pipeline => {
	const {candidates, allPipelines} = options;

	// build a map with
	// key: topicId
	// value: array of pipelines which triggered by this topic change
	const topicPipelineMap = allPipelines.reduce((map, pipeline) => {
		let pipelines = map.get(pipeline.topicId);
		if (!pipelines) {
			pipelines = [];
			map.set(pipeline.topicId, pipelines);
		}
		pipelines.push(pipeline);
		return map;
	}, new Map<string, Array<Pipeline>>());
	// build pipeline IO, which contains:
	// 1. read topics and write topics, topic which trigger current pipeline is excluded;
	// 2. trail pipelines which will triggered by this pipeline, current pipeline is excluded;
	// trail pipeline might not be triggered when write topic action is ignored by condition, here is the whole set.
	const pipelineIOs = allPipelines.map(pipeline => {
		const io: PipelineIO = {pipeline, read: [], write: [], trails: []};
		pipeline.stages.forEach(stage => {
			stage.units.forEach(unit => {
				unit.do.forEach(action => {
					// eslint-disable-next-line
					if (isReadTopicAction(action) && action.topicId != pipeline.topicId) {
						// ignore self
						io.read.push(action.topicId);
						// eslint-disable-next-line
					} else if (isWriteTopicAction(action) && action.topicId != pipeline.topicId) {
						// ignore self
						io.write.push(action.topicId);
						io.trails.push(...(topicPipelineMap.get(action.topicId) || []));
					}
				});
			});
		});
		// remove null/empty/blank/self and distinct
		// eslint-disable-next-line
		io.read = [...new Set(io.read.filter(x => x != null && x.trim().length !== 0 && x != pipeline.topicId))];
		// eslint-disable-next-line
		io.write = [...new Set(io.write.filter(x => x != null && x.trim().length !== 0 && x != pipeline.topicId))];
		io.trails = [...new Set(io.trails.filter(x => x != null && x !== pipeline))];
		return io;
	});
	// build a pipeline IO map with key of pipeline id
	const ioMap: Map<string, PipelineIO> = pipelineIOs.reduce((map, io) => {
		map.set(io.pipeline.pipelineId, io);
		return map;
	}, new Map());
	// change trail pipelines to be whole lifecycle set.
	// consider the following situation:
	// current is pipeline A. write topic X, trigger pipeline B, then pipeline B is trail pipeline of pipeline A;
	// and in pipeline B, write topic Y, trigger pipeline C, therefore pipeline C is trail pipeline of pipeline B;
	// in this case, pipeline C also treated as trail pipeline of pipeline A.
	pipelineIOs.forEach(io => {
		const nextTrails = findNextTrails(io, io.pipeline, ioMap);
		io.trails = [...new Set([...io.trails, ...nextTrails])];
	});
	// build a topic writers map
	// key: topicId
	// value: array of pipeline IOs which may write this topic
	const topicWriters = pipelineIOs.reduce((map, io) => {
		io.write.forEach(topicId => {
			let writers = map.get(topicId)!;
			if (!writers) {
				writers = [];
				map.set(topicId, writers);
				writers.push(io);
			} else if (!writers.includes(io)) {
				writers.push(io);
			}
		});
		return map;
	}, new Map<string, Array<PipelineIO>>());

	const picked = candidates.find(pipeline => {
		const otherPipelines = candidates.filter(p => p !== pipeline);
		const io = ioMap.get(pipeline.pipelineId)!;
		// find topics which will provide data for this pipeline
		const dependTopicIds = io.read;
		// find pipelines which write these topics
		const writers = dependTopicIds.map(topicId => topicWriters.get(topicId) || []).flat();
		// if any write pipeline exists in other pipelines, which means current pipeline should run after existed one.
		const writePipelines = writers.map(writer => writer.pipeline);
		const found = otherPipelines.some(one => writePipelines.includes(one));
		if (found) {
			return false;
		}
		// current pipeline doesn't depend on other pipelines
		// but it still might depend on trail pipelines of other pipelines
		const allTrails = otherPipelines.map(pipeline => ioMap.get(pipeline.pipelineId)?.trails ?? [])
			.flat()
			.filter(p => p !== pipeline);
		// if any trail pipeline will write topics which are read by current pipeline
		// current pipeline should run after the found one
		return allTrails.some(one => writePipelines.includes(one));
	});

	// return the picked one,
	// or simply returns first one when no one picked.
	return picked ?? candidates[0];
};