import {Conditional} from '@/services/data/tuples/pipeline-super-types';

export enum ConditionalEventTypes {
	TOP_TYPE_CHANGED = 'top-type-changed',
	CONTENT_CHANGED = 'content-changed',
}

export interface ConditionalEventBus {
	fire(type: ConditionalEventTypes.TOP_TYPE_CHANGED, conditional: Conditional): this;
	on(type: ConditionalEventTypes.TOP_TYPE_CHANGED, listener: (conditional: Conditional) => void): this;
	off(type: ConditionalEventTypes.TOP_TYPE_CHANGED, listener: (conditional: Conditional) => void): this;

	fire(type: ConditionalEventTypes.CONTENT_CHANGED, conditional: Conditional): this;
	on(type: ConditionalEventTypes.CONTENT_CHANGED, listener: (conditional: Conditional) => void): this;
	off(type: ConditionalEventTypes.CONTENT_CHANGED, listener: (conditional: Conditional) => void): this;
}