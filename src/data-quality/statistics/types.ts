export interface DataPanelLayout {
	column: number;
	spanColumn: number;
	row: number;
	spanRow: number;
}

export enum DataPanels {
	DAILY = 'daily',
	WEEKLY = 'weekly',
	FREE_WALK = 'free-walk'
}

export interface DataPanelLayouts {
	[DataPanels.DAILY]: DataPanelLayout;
	[DataPanels.WEEKLY]: DataPanelLayout;
	[DataPanels.FREE_WALK]: DataPanelLayout;
}

export enum DataPanelResize {
	MINIMIZE = 'min',
	MAXIMIZE = 'max',
	RESTORE = 'restore'
}