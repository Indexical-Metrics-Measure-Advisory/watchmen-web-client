import React, {useEffect, useState} from 'react';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {Report} from '@/services/tuples/report-types';

export const ReportPartController = (props: { report: Report }) => {
	const {report} = props;

	const {on, off, fire} = useReportViewEventBus();
	const [state, setState] = useState({settings: true});
	useEffect(() => {
		const onToggleSettings = (aReport: Report) => {
			// eslint-disable-next-line
			if (aReport.reportId != report.reportId) {
				return;
			}
			if (state.settings) {
				fire(ReportViewEventTypes.HIDE_SETTINGS, report);
			} else {
				fire(ReportViewEventTypes.SHOW_SETTINGS, report);
			}
			setState(state => {
				return {...state, settings: !state.settings};
			});
		};
		on(ReportViewEventTypes.TOGGLE_SETTINGS, onToggleSettings);
		return () => {
			off(ReportViewEventTypes.TOGGLE_SETTINGS, onToggleSettings);
		};
	}, [on, off, fire, report, state.settings]);

	return <></>;
};