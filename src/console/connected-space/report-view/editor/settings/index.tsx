import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {
	CHART_SETTINGS_MAX_WIDTH,
	CHART_SETTINGS_MIN_WIDTH,
	ICON_COLLAPSE_CONTENT,
	ICON_EXPAND_CONTENT
} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useReportViewEventBus} from '../../report-view-event-bus';
import {ReportViewEventTypes} from '../../report-view-event-bus-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {SettingsBody} from '../settings-body';
import {ResizeHandleAlignment, SettingsResizeHandle} from './settings-resize-handle';
import {SettingsSaver} from './settings-saver';
import {SettingsContainer, SettingsHeader, SettingsHeaderButton, SettingsHeaderTitle} from './widgets';

interface ResizeHandleState {
	width: number;
	top: number;
}

export const ReportSettings = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	const {fire: fireGlobal, on: onGlobal, off: offGlobal} = useEventBus();
	const {on: onView, off: offView} = useReportViewEventBus();
	const {fire} = useReportEditEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [sideMenuWidth, setSideMenuWidth] = useState(0);
	const [resizeState, setResizeState] = useState<ResizeHandleState>({top: 0, width: CHART_SETTINGS_MIN_WIDTH});
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		if (containerRef.current) {
			const {top, width} = containerRef.current.getBoundingClientRect();
			fireGlobal(EventTypes.ASK_SIDE_MENU_WIDTH, (sideMenuWidth: number) => {
				setSideMenuWidth(sideMenuWidth);
				setResizeState({top, width});
			});
		}
	}, [fireGlobal]);
	useEffect(() => {
		const onSideMenuResized = (sideMenuWidth: number) => {
			setSideMenuWidth(sideMenuWidth);
		};
		onGlobal(EventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		return () => {
			offGlobal(EventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		};
	}, [onGlobal, offGlobal]);
	useEffect(() => {
		const onShowSettings = () => {
			setVisible(true);
		};
		const onHideSettings = () => {
			setVisible(false);
		};
		onView(ReportViewEventTypes.SHOW_SETTINGS, onShowSettings);
		onView(ReportViewEventTypes.HIDE_SETTINGS, onHideSettings);
		return () => {
			offView(ReportViewEventTypes.SHOW_SETTINGS, onShowSettings);
			offView(ReportViewEventTypes.HIDE_SETTINGS, onHideSettings);
		};
	}, [onView, offView]);

	const onExpandAllClicked = () => fire(ReportEditEventTypes.EXPAND_ALL_SECTIONS, report);
	const onCollapseAllClicked = () => fire(ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, report);
	const onResize = (width: number) => {
		setResizeState({
			...resizeState,
			width: Math.min(Math.max(CHART_SETTINGS_MIN_WIDTH, width - sideMenuWidth), CHART_SETTINGS_MAX_WIDTH)
		});
	};

	return <>
		<SettingsContainer visible={visible} width={resizeState.width} ref={containerRef}>
			<SettingsHeader>
				<SettingsHeaderTitle>{Lang.CHART.SETTINGS_HEADER_LABEL}</SettingsHeaderTitle>
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
			</SettingsHeader>
			<SettingsBody connectedSpace={connectedSpace} subject={subject} report={report}/>
		</SettingsContainer>
		{visible
			? <SettingsResizeHandle top={resizeState.top} width={resizeState.width + sideMenuWidth} onResize={onResize}
			                        alignment={ResizeHandleAlignment.LEFT}/>
			: null}
		<SettingsSaver report={report}/>
	</>;
};