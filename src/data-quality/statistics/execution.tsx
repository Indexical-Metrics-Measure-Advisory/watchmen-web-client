import {ExecutionContent} from '../widgets/cli/types';
import {HelpExecution, isHelpExecution} from '../widgets/cli/execution/help';

export const Execution = (props: { content: ExecutionContent }) => {
	const {content} = props;

	return <>
		{isHelpExecution(content) ? <HelpExecution content={content}/> : null}
	</>;
};