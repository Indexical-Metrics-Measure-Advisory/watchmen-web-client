import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_DOWNLOAD, ICON_PALETTE, ICON_REFRESH, ICON_REPORT_DATA, ICON_SETTINGS} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadBase64AsFile, useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {useEffect, useRef} from 'react';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {ChartPart} from './chart-part';
import {ReportDataSetAndPalette} from './dataset-and-palette';
import {ReportEditEventBusProvider, useReportEditEventBus} from './report-edit-event-bus';
import {ReportEditEventTypes} from './report-edit-event-bus-types';
import {ReportSettings} from './settings';
import {ChartContainer, EditorContainer, ReportPartButton} from './widgets';

const ManualRefresh = (props: { report: Report }) => {
	const {report} = props;

	const {fire} = useReportEventBus();
	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSimulatorSwitched = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			forceUpdate();
		};
		on(ReportEditEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
		return () => {
			off(ReportEditEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
		};
	});

	if (report.simulating) {
		return null;
	}

	const onManualRefreshClicked = () => {
		// treat as structure changed anyway
		fire(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, report);
	};

	return <ReportPartButton ink={ButtonInk.PRIMARY} onClick={onManualRefreshClicked}>
		<FontAwesomeIcon icon={ICON_REFRESH}/>
	</ReportPartButton>;
};

export const ReportEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, editable: boolean }) => {
	const {connectedSpace, subject, report, editable} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireReport} = useReportEventBus();
	const {fire: fireView} = useReportViewEventBus();

	const onToggleSettingsClicked = () => {
		fireView(ReportViewEventTypes.TOGGLE_SETTINGS, report);
	};
	const onTogglePaletteClicked = () => {
		fireView(ReportViewEventTypes.TOGGLE_PALETTE, report);
	};
	const onToggleDataSetClicked = () => {
		fireView(ReportViewEventTypes.TOGGLE_DATASET, report);
	};
	const onDownloadClicked = () => {
		fireReport(ReportEventTypes.ASK_DOWNLOAD_CHART, report, (base64?: string) => {
			if (base64) {
				downloadBase64AsFile(base64, `report-${encodeURI((report.name || '').replace(/\s/g, '-'))}-${dayjs().format('YYYYMMDDHHmm')}.png`);
			} else {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNPREDICTED}</AlertLabel>);
			}
		});
	};

	return <ReportEditEventBusProvider>
		<EditorContainer editable={editable} ref={containerRef}>
			{editable ? <ReportSettings connectedSpace={connectedSpace} subject={subject} report={report}/> : null}
			<ChartContainer>
				<ReportPartButton ink={ButtonInk.PRIMARY} onClick={onToggleSettingsClicked}>
					<FontAwesomeIcon icon={ICON_SETTINGS}/>
				</ReportPartButton>
				<ReportPartButton ink={ButtonInk.PRIMARY} onClick={onTogglePaletteClicked}>
					<FontAwesomeIcon icon={ICON_PALETTE}/>
				</ReportPartButton>
				<ReportPartButton ink={ButtonInk.PRIMARY} onClick={onToggleDataSetClicked}>
					<FontAwesomeIcon icon={ICON_REPORT_DATA}/>
				</ReportPartButton>
				<ReportPartButton ink={ButtonInk.PRIMARY} onClick={onDownloadClicked}>
					<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
				</ReportPartButton>
				<ManualRefresh report={report}/>
				<ChartPart connectedSpace={connectedSpace} report={report} applyRect={false}/>
			</ChartContainer>
			<ReportDataSetAndPalette connectedSpace={connectedSpace} subject={subject} report={report}/>
		</EditorContainer>
	</ReportEditEventBusProvider>;
};