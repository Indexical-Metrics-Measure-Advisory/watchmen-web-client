import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
	CHART_SETTINGS_MAX_WIDTH,
	CHART_SETTINGS_MIN_WIDTH,
	ICON_CLOSE,
	ICON_COLLAPSE_CONTENT,
	ICON_EXPAND_CONTENT
} from '../../../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { ConnectedSpace } from '../../../../../../services/tuples/connected-space-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { SettingsBody } from '../settings-body';
import { ResizeHandleAlignment, SettingsResizeHandle } from './settings-resize-handle';
import { SettingsSaver } from './settings-saver';
import { SettingsContainer, SettingsHeader, SettingsHeaderButton, SettingsHeaderTitle } from './widgets';

interface ResizeHandleState {
	width: number;
	top: number;
}

export const ReportSettings = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const { subject, report } = props;

	const { fire } = useReportEditEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [ resizeState, setResizeState ] = useState<ResizeHandleState>({ top: 0, width: CHART_SETTINGS_MIN_WIDTH });
	useEffect(() => {
		if (containerRef.current) {
			const { top, width } = containerRef.current.getBoundingClientRect();
			setResizeState({ top, width });
		}
	}, []);

	const onExpandAllClicked = () => fire(ReportEditEventTypes.EXPAND_ALL_SECTIONS, report);
	const onCollapseAllClicked = () => fire(ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, report);
	const onCloseClicked = () => fire(ReportEditEventTypes.EDIT_COMPLETED, report);
	const onResize = (width: number) => {
		setResizeState({
			...resizeState,
			width: Math.min(Math.max(CHART_SETTINGS_MIN_WIDTH, width), CHART_SETTINGS_MAX_WIDTH)
		});
	};

	return <>
		<SettingsContainer width={resizeState.width} ref={containerRef}>
			<SettingsHeader>
				<SettingsHeaderTitle>{report.name || 'Report Edit'}</SettingsHeaderTitle>
				<SettingsHeaderButton
					tooltip={{
						label: Lang.CONSOLE.CONNECTED_SPACE.EXPAND_REPORT_SETTINGS_SECTIONS,
						alignment: TooltipAlignment.RIGHT,
						offsetX: 4
					}}
					onClick={onExpandAllClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_CONTENT}/>
				</SettingsHeaderButton>
				<SettingsHeaderButton
					tooltip={{
						label: Lang.CONSOLE.CONNECTED_SPACE.COLLAPSE_REPORT_SETTINGS_SECTIONS,
						alignment: TooltipAlignment.RIGHT,
						offsetX: 4
					}}
					onClick={onCollapseAllClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/>
				</SettingsHeaderButton>
				<SettingsHeaderButton
					tooltip={{ label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT, offsetX: 4 }}
					onClick={onCloseClicked}>
					<FontAwesomeIcon icon={ICON_CLOSE}/>
				</SettingsHeaderButton>
			</SettingsHeader>
			<SettingsBody subject={subject} report={report}/>
		</SettingsContainer>
		<SettingsResizeHandle top={resizeState.top} width={resizeState.width} onResize={onResize}
		                      alignment={ResizeHandleAlignment.RIGHT}/>
		<SettingsSaver report={report}/>
	</>;
};