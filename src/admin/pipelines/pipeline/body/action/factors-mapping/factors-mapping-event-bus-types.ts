import {MappingFactor} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';

export enum FactorsMappingEventTypes {
	MAPPING_ADDED = 'mapping-added',
	MAPPING_REMOVED = 'mapping-removed',
	MAPPING_CHANGED = 'mapping-changed'
}

export interface FactorsMappingEventBus {
	fire(type: FactorsMappingEventTypes.MAPPING_ADDED, mapping: MappingFactor): this;
	on(type: FactorsMappingEventTypes.MAPPING_ADDED, listener: (mapping: MappingFactor) => void): this;
	off(type: FactorsMappingEventTypes.MAPPING_ADDED, listener: (mapping: MappingFactor) => void): this;

	fire(type: FactorsMappingEventTypes.MAPPING_REMOVED, mapping: MappingFactor): this;
	on(type: FactorsMappingEventTypes.MAPPING_REMOVED, listener: (mapping: MappingFactor) => void): this;
	off(type: FactorsMappingEventTypes.MAPPING_REMOVED, listener: (mapping: MappingFactor) => void): this;

	fire(type: FactorsMappingEventTypes.MAPPING_CHANGED, mapping: MappingFactor): this;
	on(type: FactorsMappingEventTypes.MAPPING_CHANGED, listener: (mapping: MappingFactor) => void): this;
	off(type: FactorsMappingEventTypes.MAPPING_CHANGED, listener: (mapping: MappingFactor) => void): this;
}