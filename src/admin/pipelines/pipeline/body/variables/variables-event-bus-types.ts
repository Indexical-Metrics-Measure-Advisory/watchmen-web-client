import {DeclaredVariables} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum VariablesEventTypes {
	ASK_VARIABLES = 'ask-variables',
	REPLY_VARIABLES = 'reply-variables',

	VARIABLE_CHANGED = 'variable-changed'
}

export interface VariablesEventBus {
	fire(type: VariablesEventTypes.ASK_VARIABLES): this;
	on(type: VariablesEventTypes.ASK_VARIABLES, listener: () => void): this;
	off(type: VariablesEventTypes.ASK_VARIABLES, listener: () => void): this;

	fire(type: VariablesEventTypes.REPLY_VARIABLES, variables: DeclaredVariables, topics: Array<Topic>, triggerTopic?: Topic): this;
	once(type: VariablesEventTypes.REPLY_VARIABLES, listener: (variables: DeclaredVariables, topics: Array<Topic>, triggerTopic?: Topic) => void): this;

	fire(type: VariablesEventTypes.VARIABLE_CHANGED): this;
	on(type: VariablesEventTypes.VARIABLE_CHANGED, listener: () => void): this;
	off(type: VariablesEventTypes.VARIABLE_CHANGED, listener: () => void): this;
}