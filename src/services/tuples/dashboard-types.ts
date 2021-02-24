import { Tuple } from './tuple-types';

export interface Dashboard extends Tuple {
	dashboardId: string;
	name: string;
	reportIds: Array<string>;
	lastVisitTime: string;
}