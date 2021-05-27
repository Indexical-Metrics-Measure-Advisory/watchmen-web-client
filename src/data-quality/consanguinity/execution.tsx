import {ExecutionContent} from '../widgets/cli/types';
import {PipelineList} from './pipeline-list';

export const Execution = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	return <>
		<PipelineList content={content}/>
	</>;
};