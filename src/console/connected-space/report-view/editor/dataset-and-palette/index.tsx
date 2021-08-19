import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {Report} from '../../../../../services/tuples/report-types';
import {ReportDataSetAndPaletteContainer, TabHeader, TabHeaders} from './widget';
import {useReportViewEventBus} from '../../report-view-event-bus';
import {useEffect, useState} from 'react';
import {ReportViewEventTypes} from '../../report-view-event-bus-types';
import {Lang} from '../../../../../langs';

export const ReportDataSetAndPalette = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const {on, off} = useReportViewEventBus();
	const [visible, setVisible] = useState(false);
	const [activeTab, setActiveTab] = useState('');
	useEffect(() => {
		const onToggleDataSet = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			if (visible) {
				if (activeTab !== 'dataset') {
					setActiveTab('dataset');
				} else {
					setVisible(false);
				}
			} else {
				setActiveTab('dataset');
				setVisible(true);
			}
		};
		const onTogglePalette = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			if (visible) {
				if (activeTab === 'dataset' || activeTab === '') {
					setActiveTab('basic-style');
				} else {
					setVisible(false);
				}
			} else {
				setActiveTab('basic-style');
				setVisible(true);
			}
		};
		on(ReportViewEventTypes.TOGGLE_DATASET, onToggleDataSet);
		on(ReportViewEventTypes.TOGGLE_PALETTE, onTogglePalette);
		return () => {
			off(ReportViewEventTypes.TOGGLE_DATASET, onToggleDataSet);
			off(ReportViewEventTypes.TOGGLE_PALETTE, onTogglePalette);
		};
	}, [on, off, visible, activeTab, report]);

	const onTabClicked = (tab: string) => () => {
		if (tab === activeTab) {
			return;
		}

		setActiveTab(tab);
	};

	return <ReportDataSetAndPaletteContainer visible={visible}>
		<TabHeaders>
			<TabHeader active={activeTab === 'title'} onClick={onTabClicked('title')}>
				{Lang.CHART.SECTION_TITLE_ECHART_TITLE}
			</TabHeader>
			<TabHeader active={activeTab === 'basic-style'} onClick={onTabClicked('basic-style')}>
				{Lang.CHART.SECTION_TITLE_BASIC_STYLE}
			</TabHeader>
			<TabHeader active={activeTab === 'dataset'} onClick={onTabClicked('dataset')}>
				{Lang.CONSOLE.CONNECTED_SPACE.REPORT_DATA}
			</TabHeader>
		</TabHeaders>
	</ReportDataSetAndPaletteContainer>;
};