import {Inspection} from '@/services/data/tuples/inspection-types';

export enum InspectionEventTypes {
	INSPECTION_PICKED = 'inspection-picked',
	INDICATOR_PICKED = 'indicator-picked',

	SAVE_INSPECTION = 'save-inspection',
	INSPECTION_SAVED = 'inspection-saved'
}

export interface InspectionEventBus {
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