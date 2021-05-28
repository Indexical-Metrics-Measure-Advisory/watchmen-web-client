import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_TOPIC} from '../commands';
import {isTopicListCommand, TopicList} from './topic-list';

const Commands = [
	{accept: isTopicListCommand, painter: TopicList}
];

export const isTopicCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 1) {
		return false;
	}
	if (command[0].command !== CMD_TOPIC) {
		return false;
	}

	return Commands.some(command => command.accept(content));
};

export const TopicCommand = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const Command = Commands.find(({accept}) => accept(content))?.painter;

	if (Command) {
		return <Command content={content}/>;
	} else {
		return null;
	}
};