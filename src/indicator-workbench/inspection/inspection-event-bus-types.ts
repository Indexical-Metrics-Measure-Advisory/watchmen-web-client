import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';

export enum InspectionEventTypes {
	ASK_INSPECTIONS = 'ask-inspections',
	ASK_INDICATORS = 'ask-indicators',
	ASK_INDICATOR = 'ask-indicator',

	INSPECTION_PICKED = 'inspection-picked',
	INDICATOR_PICKED = 'indicator-picked',

	SAVE_INSPECTION = 'save-inspection',
	INSPECTION_SAVED = 'inspection-saved'
}

export interface InspectionEventBus {
	fire(type: InspectionEventTypes.ASK_INSPECTIONS, onData: (inspections: Array<QueryInspection>) => void): this;
	on(type: InspectionEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryInspection>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryInspection>) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_INDICATORS, onData: (indicators: Array<QueryIndicator>) => void): this;
	on(type: InspectionEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<QueryIndicator>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<QueryIndicator>) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_INDICATOR, indicatorId: IndicatorId, onData: (indicator: Indicator, topic?: TopicForIndicator, enums?: Array<EnumForIndicator>) => void): this;
	on(type: InspectionEventTypes.ASK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: Indicator, topic?: TopicForIndicator, enums?: Array<EnumForIndicator>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: Indicator, topic?: TopicForIndicator, enums?: Array<EnumForIndicator>) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_PICKED, inspection: Inspection): this;
	on(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.INDICATOR_PICKED, inspection: Inspection): this;
	on(type: InspectionEventTypes.INDICATOR_PICKED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.INDICATOR_PICKED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.SAVE_INSPECTION, inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void): this;
	on(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;
	off(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_SAVED, inspection: Inspection): this;
	on(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;
}