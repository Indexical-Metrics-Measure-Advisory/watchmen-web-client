import { Tuple } from './tuple-types';

export interface Dashboard extends Tuple {
	dashboardId: string;
	name: string;
	chartIds: Array<string>;
	lastVisitTime: string;
}