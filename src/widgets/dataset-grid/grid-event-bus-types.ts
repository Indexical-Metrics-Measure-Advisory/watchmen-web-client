import {ColumnDefs, DataPage, DragColumnState} from './types';

export enum GridEventTypes {
	DATA_LOADED = 'data-loaded',

	SELECTION_CHANGED = 'selection-changed',
	REPAINT_SELECTION = 'repaint-selection',
	FIX_COLUMN_CHANGED = 'fix-column-changed',
	COMPRESS_COLUMN_WIDTH = 'compress-column-width',
	DRAG_COLUMN_VISIBLE_CHANGED = 'drag-column-visible-changed',
	ASK_DRAG_COLUMN_VISIBLE = 'determine-drag-column-visible',
	DRAG_COLUMN_STATE_CHANGED = 'drag-column-state-changed',

	SIMULATOR_SWITCHED = 'simulator-switched',
	SIMULATE_DATA_UPLOADED = 'simulate-data-uploaded'
}

export interface GridEventBus {
	fire(type: GridEventTypes.DATA_LOADED, page: DataPage, columnDefs: ColumnDefs): this;
	on(type: GridEventTypes.DATA_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;
	off(type: GridEventTypes.DATA_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;

	fire(type: GridEventTypes.SELECTION_CHANGED, inFixTable: boolean, rowIndex: number, columnIndex: number): this;
	on(type: GridEventTypes.SELECTION_CHANGED, listener: (inFixTable: boolean, rowIndex: number, columnIndex: number) => void): this;
	off(type: GridEventTypes.SELECTION_CHANGED, listener: (inFixTable: boolean, rowIndex: number, columnIndex: number) => void): this;

	fire(type: GridEventTypes.REPAINT_SELECTION): this;
	on(type: GridEventTypes.REPAINT_SELECTION, listener: () => void): this;
	off(type: GridEventTypes.REPAINT_SELECTION, listener: () => void): this;

	fire(type: GridEventTypes.FIX_COLUMN_CHANGED, fix: boolean, columnCount: number): this;
	on(type: GridEventTypes.FIX_COLUMN_CHANGED, listener: (fix: boolean, columnCount: number) => void): this;
	off(type: GridEventTypes.FIX_COLUMN_CHANGED, listener: (fix: boolean, columnCount: number) => void): this;

	fire(type: GridEventTypes.COMPRESS_COLUMN_WIDTH): this;
	on(type: GridEventTypes.COMPRESS_COLUMN_WIDTH, listener: () => void): this;
	off(type: GridEventTypes.COMPRESS_COLUMN_WIDTH, listener: () => void): this;

	fire(type: GridEventTypes.DRAG_COLUMN_VISIBLE_CHANGED, visible: boolean): this;
	on(type: GridEventTypes.DRAG_COLUMN_VISIBLE_CHANGED, listener: (visible: boolean) => void): this;
	off(type: GridEventTypes.DRAG_COLUMN_VISIBLE_CHANGED, listener: (visible: boolean) => void): this;

	fire(type: GridEventTypes.ASK_DRAG_COLUMN_VISIBLE, onVisibleGet: (visible: boolean) => void): this;
	on(type: GridEventTypes.ASK_DRAG_COLUMN_VISIBLE, listener: (onVisibleGet: (visible: boolean) => void) => void): this;
	off(type: GridEventTypes.ASK_DRAG_COLUMN_VISIBLE, listener: (onVisibleGet: (visible: boolean) => void) => void): this;

	fire(type: GridEventTypes.DRAG_COLUMN_STATE_CHANGED, state: Partial<DragColumnState>): this;
	on(type: GridEventTypes.DRAG_COLUMN_STATE_CHANGED, listener: (state: Partial<DragColumnState>) => void): this;
	off(type: GridEventTypes.DRAG_COLUMN_STATE_CHANGED, listener: (state: Partial<DragColumnState>) => void): this;

	fire(type: GridEventTypes.SIMULATOR_SWITCHED, on: boolean): this;
	on(type: GridEventTypes.SIMULATOR_SWITCHED, listener: (on: boolean) => void): this;
	off(type: GridEventTypes.SIMULATOR_SWITCHED, listener: (on: boolean) => void): this;

	fire(type: GridEventTypes.SIMULATE_DATA_UPLOADED, page: DataPage): this;
	on(type: GridEventTypes.SIMULATE_DATA_UPLOADED, listener: (page: DataPage) => void): this;
	off(type: GridEventTypes.SIMULATE_DATA_UPLOADED, listener: (page: DataPage) => void): this;
}