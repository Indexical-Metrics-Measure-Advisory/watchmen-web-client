import {DataPanelLayouts, DataPanels} from './types';

export const DEFAULT_LAYOUTS: DataPanelLayouts = {
	[DataPanels.DAILY]: {column: 1, spanColumn: 2, row: 1, spanRow: 4},
	[DataPanels.WEEKLY]: {column: 3, spanColumn: 2, row: 1, spanRow: 2},
	[DataPanels.FREE_WALK]: {column: 3, spanColumn: 2, row: 3, spanRow: 2}
};