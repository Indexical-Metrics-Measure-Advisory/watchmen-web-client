import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {detectFunnels} from '@/services/data/tuples/report-utils';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useEffect} from 'react';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../console-event-bus';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes} from '../../../../console-event-bus-types';
import {Section} from '../settings-widgets/section';
import {FunnelItem} from './funnel-item';
import {FunnelDescription, FunnelTable, FunnelTableHeaderCell, NoFunnel} from './widgets';

const merge = (existed: Array<ReportFunnel>, detected: Array<ReportFunnel>): Array<ReportFunnel> => {
	return detected.map(funnel => {
		const {columnId, type} = funnel;
		// eslint-disable-next-line
		const exist = existed.find(funnel => funnel.columnId == columnId && funnel.type === type);
		if (exist) {
			// replaced with existed one
			return exist;
		} else {
			// use detected one
			return funnel;
		}
	});
};

export const FunnelDef = (props: { subject: Subject, report: Report }) => {
	const {subject, report} = props;

	const {fire: fireConsole} = useConsoleEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
			const existedFunnels = report.funnels || [];
			const detectedFunnels = detectFunnels(subject, availableTopics);
			report.funnels = merge(existedFunnels, detectedFunnels);
			forceUpdate();
		});
	}, [fireConsole, forceUpdate, subject, report]);

	const funnels = report.funnels || [];

	return <Section title={Lang.CHART.SECTION_TITLE_FUNNEL_DEFINITION} defaultExpanded={true}>
		{funnels.length === 0
			? <NoFunnel>{Lang.CHART.NO_FUNNEL_DETECTED}</NoFunnel>
			: <>
				<FunnelTable>
					<FunnelTableHeaderCell/>
					<FunnelTableHeaderCell>{Lang.FUNNEL.COLUMN}</FunnelTableHeaderCell>
					<FunnelTableHeaderCell>{Lang.FUNNEL.RANGE}</FunnelTableHeaderCell>
					<FunnelTableHeaderCell>{Lang.FUNNEL.ENABLED}</FunnelTableHeaderCell>
					{funnels.map((funnel, index) => {
						return <FunnelItem key={funnel.funnelId}
						                   subject={subject} report={report} funnel={funnel} index={index + 1}/>;
					})}
				</FunnelTable>
			</>}
		<FunnelDescription>{Lang.CHART.FUNNEL_DESCRIPTION}</FunnelDescription>
		<FunnelDescription>{Lang.CHART.FUNNEL_INSTANCE_DESCRIPTION}</FunnelDescription>
	</Section>;
};