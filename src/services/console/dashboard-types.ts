export interface Dashboard {
	dashboardId: string;
	name: string;
	chartIds: Array<string>;
	lastVisitTime: string;
	createTime: string;
	lastModifyTime: string;
}