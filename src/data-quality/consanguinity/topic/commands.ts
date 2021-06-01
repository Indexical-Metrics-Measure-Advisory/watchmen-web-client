import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {getTopicName} from '../../utils';
import {Topic} from '../../../services/tuples/topic-types';

export const CMD_TOPIC = '/topic';

const TopicFindCmd: Command = {
	label: '',
	command: '',
	reminder: 'An id or part of name',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};

const TopicListCmd = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all topics',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};

const TopicIdCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to view defail',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};
const TopicViewCmd: Command = {
	label: 'View',
	command: CMD_ARGUMENT_VIEW,
	reminder: 'An id, or a fully qualified name of topic',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicIdCmd],
	executableOnNoTrail: false
};

export const TopicCmd: Command = {
	label: 'Topic',
	command: CMD_TOPIC,
	reminder: 'A text to search by id or name; or "list" to list all',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicFindCmd, TopicListCmd, TopicViewCmd],
	executableOnNoTrail: false
};

export const buildViewTopicCommand = (topic: Topic): Array<Readonly<Command>> => {
	return [TopicCmd, TopicViewCmd, {
		...TopicIdCmd,
		label: getTopicName(topic),
		command: topic.topicId
	}];
};
