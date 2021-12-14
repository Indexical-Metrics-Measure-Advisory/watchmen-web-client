import {Navigation, NavigationId} from '@/services/data/tuples/navigation-types';
import {QueryNavigation} from '@/services/data/tuples/query-navigation-types';

export enum NavigationEventTypes {
	ASK_INSPECTIONS = 'ask-inspections',
	ASK_INSPECTION = 'ask-inspection',
}

export interface NavigationEventBus {
	fire(type: NavigationEventTypes.ASK_INSPECTIONS, onData: (inspections: Array<QueryNavigation>) => void): this;
	on(type: NavigationEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryNavigation>) => void) => void): this;
	off(type: NavigationEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryNavigation>) => void) => void): this;

	fire(type: NavigationEventTypes.ASK_INSPECTION, inspectionId: NavigationId, onData: (inspection: Navigation) => void): this;
	on(type: NavigationEventTypes.ASK_INSPECTION, listener: (inspectionId: NavigationId, onData: (inspection: Navigation) => void) => void): this;
	off(type: NavigationEventTypes.ASK_INSPECTION, listener: (inspectionId: NavigationId, onData: (inspection: Navigation) => void) => void): this;
}