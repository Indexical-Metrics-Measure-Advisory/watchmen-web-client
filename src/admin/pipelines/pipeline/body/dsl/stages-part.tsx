import React, { Fragment } from 'react';
import { v4 } from 'uuid';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { EmptyLine, LineComment } from './dsl-widgets';
import { StagePart } from './stage-part';

export const StagesPart = (props: { pipeline: Pipeline, topicsMap: Map<string, Topic> }) => {
	const { pipeline, topicsMap } = props;

	return <>
		<EmptyLine/>
		{
			pipeline.stages.map((stage, stageIndex) => {
				return <Fragment key={v4()}>
					{stageIndex !== 0 ? <EmptyLine/> : null}
					<LineComment>Stage {stageIndex + 1}</LineComment>
					<StagePart pipeline={pipeline} stage={stage} topicsMap={topicsMap}/>
				</Fragment>;
			})
		}
	</>;
};