import { useEffect, useState } from 'react';
import { useReportEventBus } from '../../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../../report/report-event-bus-types';
import { saveReport } from '../../../../../../services/tuples/report';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';

interface SaveState {
	styleChanged: boolean;
	structureChanged: boolean;
}

export const SettingsSaver = (props: { report: Report }) => {
	const { report } = props;

	const { fire: fireReport } = useReportEventBus();
	const { on, off } = useReportEditEventBus();
	const [ changed, setChanged ] = useState<SaveState>({ styleChanged: false, structureChanged: false });
	useEffect(() => {
		const onChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			setChanged({ ...changed, styleChanged: true });
		};
		const onStructureChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			fireReport(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, report);
			setChanged({ ...changed, structureChanged: true });
		};
		const onEditCompleted = (completedReport: Report) => {
			if (completedReport !== report) {
				return;
			}
			if (!changed.styleChanged && !changed.structureChanged) {
				// nothing changed
				fireReport(ReportEventTypes.EDIT_COMPLETED, report, false, false);
			} else if (!changed.structureChanged) {
				// style changed, structure kept
				fireReport(ReportEventTypes.EDIT_COMPLETED, report, true, false);
			} else {
				// structure changed
				(async () => {
					await saveReport(report);
					fireReport(ReportEventTypes.EDIT_COMPLETED, report, true, true);
				})();
			}
		};
		on(ReportEditEventTypes.SIZE_CHANGED, onChanged);
		on(ReportEditEventTypes.NAME_CHANGED, onChanged);
		on(ReportEditEventTypes.DESCRIPTION_CHANGED, onChanged);

		on(ReportEditEventTypes.BASIC_STYLE_CHANGED, onChanged);
		on(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, onChanged);

		on(ReportEditEventTypes.CHART_TYPE_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_ADDED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_REMOVED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_ADDED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_REMOVED, onStructureChanged);

		on(ReportEditEventTypes.EDIT_COMPLETED, onEditCompleted);

		return () => {
			off(ReportEditEventTypes.SIZE_CHANGED, onChanged);
			off(ReportEditEventTypes.NAME_CHANGED, onChanged);
			off(ReportEditEventTypes.DESCRIPTION_CHANGED, onChanged);

			off(ReportEditEventTypes.BASIC_STYLE_CHANGED, onChanged);
			off(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, onChanged);

			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_ADDED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_REMOVED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_ADDED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_REMOVED, onStructureChanged);

			off(ReportEditEventTypes.EDIT_COMPLETED, onEditCompleted);
		};
	}, [ on, off, fireReport, report, changed ]);

	return <></>;
};