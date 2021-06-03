import {Command, CommandPublishedBehaviorType} from '../../command/types';

export const CMD_GRAPH = '/graph';

export const CMD_ARGUMENT_FACTOR = 'factor';

const GraphFactorCmd: Command = {
	label: 'Show Factor',
	command: CMD_ARGUMENT_FACTOR,
	reminder: 'Press "enter" to view graphics',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
export const GraphCmd: Command = {
	label: 'Graph',
	command: CMD_GRAPH,
	reminder: 'Press "enter" to view graphics; or show relevant factors by "factor"',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [GraphFactorCmd],
	executableOnNoTrail: true
};
