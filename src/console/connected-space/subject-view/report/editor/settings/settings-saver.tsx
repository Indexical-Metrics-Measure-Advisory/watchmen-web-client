import { useEffect, useState } from 'react';
import { useReportEventBus } from '../../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../../report/report-event-bus-types';
import { saveReport } from '../../../../../../services/tuples/report';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';

export const SettingsSaver = (props: { report: Report }) => {
	const { report } = props;

	const { fire: fireReport } = useReportEventBus();
	const { on, off } = useReportEditEventBus();
	const [ changed, setChanged ] = useState(false);
	const [ shouldReloadData, setShouldReloadData ] = useState(false);
	useEffect(() => {
		const onChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			setChanged(true);
		};
		const onStructureChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			setShouldReloadData(true);
			setChanged(true);
		};
		const onEditCompleted = (completedReport: Report) => {
			if (completedReport !== report) {
				return;
			}
			if (!changed) {
				// nothing changed
				fireReport(ReportEventTypes.EDIT_COMPLETED, report, false, false);
			} else if (!shouldReloadData) {
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

		on(ReportEditEventTypes.EDIT_COMPLETED, onEditCompleted);

		return () => {
			off(ReportEditEventTypes.SIZE_CHANGED, onChanged);
			off(ReportEditEventTypes.NAME_CHANGED, onChanged);
			off(ReportEditEventTypes.DESCRIPTION_CHANGED, onChanged);

			off(ReportEditEventTypes.BASIC_STYLE_CHANGED, onChanged);
			off(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, onChanged);

			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_CHANGED, onStructureChanged);

			off(ReportEditEventTypes.EDIT_COMPLETED, onEditCompleted);
		};
	}, [ on, off, fireReport, report, changed, shouldReloadData ]);

	return <></>;
};