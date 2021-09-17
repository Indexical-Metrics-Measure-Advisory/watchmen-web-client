import {HelpExecution, isHelpExecution} from '../widgets/cli/execution/help';
import {ExecutionContent} from '../widgets/cli/types';

export const Execution = (props: { content: ExecutionContent }) => {
	const {content} = props;

	return <>
		{isHelpExecution(content) ? <HelpExecution content={content}/> : null}
	</>;
};