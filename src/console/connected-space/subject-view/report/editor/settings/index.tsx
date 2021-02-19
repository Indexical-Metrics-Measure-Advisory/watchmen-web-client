import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
	CHART_SETTINGS_MAX_WIDTH,
	CHART_SETTINGS_MIN_WIDTH,
	ICON_CLOSE
} from '../../../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { useReportEventBus } from '../../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../../report/report-event-bus-types';
import { ConnectedSpace } from '../../../../../../services/tuples/connected-space-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { SettingsBody } from '../settings-body';
import { ResizeHandleAlignment, SettingsResizeHandle } from './settings-resize-handle';
import { SettingsContainer, SettingsHeader, SettingsHeaderButton, SettingsHeaderTitle } from './widgets';

interface ResizeHandleState {
	width: number;
	top: number;
}

export const ReportSettings = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const { report } = props;

	const { fire } = useReportEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [ resizeState, setResizeState ] = useState<ResizeHandleState>({ top: 0, width: CHART_SETTINGS_MIN_WIDTH });
	useEffect(() => {
		if (containerRef.current) {
			const { top, width } = containerRef.current.getBoundingClientRect();
			setResizeState({ top, width });
		}
	}, []);

	const onCloseClicked = () => fire(ReportEventTypes.EDIT_COMPLETED, report);
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
					tooltip={{ label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT, offsetX: 4 }}
					onClick={onCloseClicked}>
					<FontAwesomeIcon icon={ICON_CLOSE}/>
				</SettingsHeaderButton>
			</SettingsHeader>
			<SettingsBody report={report}/>
		</SettingsContainer>
		<SettingsResizeHandle top={resizeState.top} width={resizeState.width} onResize={onResize}
		                      alignment={ResizeHandleAlignment.RIGHT}/>
	</>;
};