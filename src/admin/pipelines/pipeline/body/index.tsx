import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { PipelineBodyContainer } from './widgets';

export const PipelineBody = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	return <PipelineBodyContainer>

	</PipelineBodyContainer>;
};