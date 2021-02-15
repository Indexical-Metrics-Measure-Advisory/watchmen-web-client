import { Conditional } from '../../../../../services/tuples/pipeline-super-types';

export enum ConditionalEventTypes {
	TOP_TYPE_CHANGED = 'top-type-changed'
}

export interface ConditionalEventBus {
	fire(type: ConditionalEventTypes.TOP_TYPE_CHANGED, conditional: Conditional): this;
	on(type: ConditionalEventTypes.TOP_TYPE_CHANGED, listener: (conditional: Conditional) => void): this;
	off(type: ConditionalEventTypes.TOP_TYPE_CHANGED, listener: (conditional: Conditional) => void): this;
}