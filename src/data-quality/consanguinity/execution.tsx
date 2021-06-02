import {ExecutionContent} from '../widgets/cli/types';
import {isPipelineExecution, PipelineExecution} from './pipeline';
import {isTopicExecution, TopicExecution} from './topic';
import {HelpExecution, isHelpExecution} from '../widgets/cli/execution/help';
import {FlowExecution, isFlowExecution} from './flow';

export const Execution = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	return <>
		{isPipelineExecution(content) ? <PipelineExecution content={content}/> : null}
		{isTopicExecution(content) ? <TopicExecution content={content}/> : null}
		{isFlowExecution(content) ? <FlowExecution content={content}/> : null}
		{isHelpExecution(content) ? <HelpExecution content={content}/> : null}
	</>;
};