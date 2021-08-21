import React, {useRef} from 'react';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Report} from '../../../../services/tuples/report-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {ChartPart} from './chart-part';
import {ReportEditEventBusProvider} from './report-edit-event-bus';
import {ReportSettings} from './settings';
import {ChartContainer, EditorContainer, ReportPartButton} from './widgets';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {
	ICON_DOWNLOAD,
	ICON_PALETTE,
	ICON_REFRESH,
	ICON_REPORT_DATA,
	ICON_SETTINGS
} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ButtonInk} from '../../../../basic-widgets/types';
import {ReportDataSetAndPalette} from './dataset-and-palette';
import {EventTypes} from '../../../../events/types';
import {useEventBus} from '../../../../events/event-bus';
import {useReportEventBus} from '../../../../report/report-event-bus';
import {ReportEventTypes} from '../../../../report/report-event-bus-types';
import {AlertLabel} from '../../../../alert/widgets';
import {Lang} from '../../../../langs';
import dayjs from 'dayjs';

export const ReportEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, editable: boolean }) => {
	const {connectedSpace, subject, report, editable} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {once: onceReport} = useReportEventBus();
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
		onceReport(ReportEventTypes.CHART_BASE64_READY, (aReport: Report, base64?: string) => {
			if (base64) {
				const link = document.createElement('a');
				link.href = base64;
				link.target = '_blank';
				link.download = `report-${encodeURI((report.name || '').replace(/\s/g, '-'))}-${dayjs().format('YYYYMMDDHHmm')}.png`;
				link.click();
			} else {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNPREDICTED}</AlertLabel>);
			}
		}).fire(ReportEventTypes.ASK_DOWNLOAD_CHART, report);
	};
	const onManualRefreshClicked = () => {
		fireView(ReportViewEventTypes.REFRESH_REPORTS, report);
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
				<ReportPartButton ink={ButtonInk.PRIMARY} onClick={onManualRefreshClicked}>
					<FontAwesomeIcon icon={ICON_REFRESH}/>
				</ReportPartButton>
				<ChartPart report={report} applyRect={false}/>
			</ChartContainer>
			<ReportDataSetAndPalette connectedSpace={connectedSpace} subject={subject} report={report}/>
		</EditorContainer>
	</ReportEditEventBusProvider>;
};