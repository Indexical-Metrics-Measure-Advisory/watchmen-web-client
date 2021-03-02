import { Paragraph } from '../../services/tuples/paragraph';
import { Report } from '../../services/tuples/report-types';

export enum DashboardEventTypes {
	REPORT_ADDED = 'report-added',
	REPORT_REMOVED = 'report-removed',

	PARAGRAPH_ADDED = 'paragraph-added',
	PARAGRAPH_REMOVED = 'paragraph-removed',

	TOGGLE_PRINT_PAGE_SIZE = 'toggle-print-page-size'
}

export interface DashboardEventBus {
	fire(type: DashboardEventTypes.REPORT_ADDED, report: Report): this;
	on(type: DashboardEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;
	off(type: DashboardEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;

	fire(type: DashboardEventTypes.REPORT_REMOVED, report: Report): this;
	on(type: DashboardEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;
	off(type: DashboardEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;

	fire(type: DashboardEventTypes.PARAGRAPH_ADDED, paragraph: Paragraph): this;
	on(type: DashboardEventTypes.PARAGRAPH_ADDED, listener: (paragraph: Paragraph) => void): this;
	off(type: DashboardEventTypes.PARAGRAPH_ADDED, listener: (paragraph: Paragraph) => void): this;

	fire(type: DashboardEventTypes.PARAGRAPH_REMOVED, paragraph: Paragraph): this;
	on(type: DashboardEventTypes.PARAGRAPH_REMOVED, listener: (paragraph: Paragraph) => void): this;
	off(type: DashboardEventTypes.PARAGRAPH_REMOVED, listener: (paragraph: Paragraph) => void): this;

	fire(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, visible: boolean): this;
	on(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
	off(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
}