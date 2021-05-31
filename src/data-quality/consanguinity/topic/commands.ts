import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';

export const CMD_TOPIC = '/topic';

export const CMD_ARGUMENT_FIND = 'find';
export const CMD_ARGUMENT_LIST = 'list';

export const TopicNameCriteriaCommand: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to find pipeline',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward
};
export const TopicFindCmd: Command = {
	label: 'Find',
	command: CMD_ARGUMENT_FIND,
	reminder: 'A text to match name.',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicNameCriteriaCommand],
	executableOnNoTrail: false
};
export const TopicListCmd = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all topics.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
export const TopicCmd: Command = {
	label: 'Topic',
	command: CMD_TOPIC,
	reminder: '"find" to find topic by name, or "list" to list all.',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicFindCmd, TopicListCmd],
	executableOnNoTrail: false
};
