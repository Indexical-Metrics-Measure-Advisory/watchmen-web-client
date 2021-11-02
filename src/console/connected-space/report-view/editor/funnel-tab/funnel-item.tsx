import {Enum, EnumId, EnumItem} from '@/services/data/tuples/enum-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {FunnelEditor} from '@/widgets/funnel';
import {FunnelEventBusProvider, useFunnelEventBus} from '@/widgets/funnel/funnel-event-bus';
import {FunnelEventTypes} from '@/widgets/funnel/funnel-event-bus-types';
import {ReportFunnelLabels} from '@/widgets/funnel/widgets';
import React, {Fragment, ReactNode, useEffect} from 'react';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../console-event-bus';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes} from '../../../../console-event-bus-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropName} from '../settings-widgets/widgets';
import {FunnelItemContainer, FunnelValues, PairToLabel} from './widgets';

const PairJoint = () => {
	return <PairToLabel>~</PairToLabel>;
};

const FunnelEnumHandler = (props: { subject: Subject; funnel: ReportFunnel }) => {
	const {subject, funnel} = props;

	const {on: onConsole, off: offConsole, fire: fireConsole} = useConsoleEventBus();
	const {on, off, fire} = useFunnelEventBus();
	useEffect(() => {
		const replyEnumNoItems = (onData: (enumeration: Enum) => void, enumId: EnumId) => {
			onData({enumId, name: '', items: [] as Array<EnumItem>} as Enum);
		};
		const onAskEnum = (aFunnel: ReportFunnel, onData: (enumeration: Enum) => void) => {
			if (aFunnel !== funnel) {
				return;
			}

			const columnId = funnel.columnId;
			// eslint-disable-next-line
			const column = subject.dataset.columns.find(column => column.columnId == columnId);
			if (column == null) {
				// reply a mock one with no enum id and items
				replyEnumNoItems(onData, '');
				return;
			}

			if (!isTopicFactorParameter(column.parameter)) {
				// assume parameter is link to a factor, otherwise do nothing
				// reply a mock one with no enum id and items
				replyEnumNoItems(onData, '');
				return;
			}

			const {topicId, factorId} = column.parameter;
			fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
				// eslint-disable-next-line
				const topic = availableTopics.find(topic => topic.topicId == topicId);
				if (topic == null) {
					// reply a mock one with no enum id and items
					replyEnumNoItems(onData, '');
					return;
				}

				// eslint-disable-next-line
				const factor = topic.factors.find(factor => factor.factorId == factorId);
				if (factor == null) {
					// reply a mock one with no enum id and items
					replyEnumNoItems(onData, '');
					return;
				}

				const enumId = factor.enumId;
				if (!enumId) {
					// reply a mock one with no enum id and items
					replyEnumNoItems(onData, '');
					return;
				}

				fireConsole(ConsoleEventTypes.ASK_ENUM, enumId, (enumeration?: Enum) => {
					if (!enumeration) {
						// reply a mock one with no enum id and items
						replyEnumNoItems(onData, '');
					} else {
						// bridge event to funnel bus
						onData(enumeration);
					}
				});
			});
		};
		on(FunnelEventTypes.ASK_ENUM, onAskEnum);
		return () => {
			off(FunnelEventTypes.ASK_ENUM, onAskEnum);
		};
	}, [fire, on, off, fireConsole, onConsole, offConsole, subject.dataset.columns, funnel]);

	return <Fragment/>;
};

const FunnelEditorDelegate = (props: { subject: Subject; report: Report; funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {subject, report, funnel, pairJoint} = props;

	const {on: onReport, off: offReport, fire: fireReport} = useReportEditEventBus();
	const {on, off, fire} = useFunnelEventBus();
	useEffect(() => {
		const onFunnelRangeChanged = (aReport: Report, aFunnel: ReportFunnel) => {
			if (aReport !== report || aFunnel !== funnel) {
				return;
			}

			fire(FunnelEventTypes.RANGE_CHANGED, funnel);
		};
		onReport(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onFunnelRangeChanged);
		return () => {
			offReport(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onFunnelRangeChanged);
		};
	}, [fire, on, off, onReport, offReport, report, funnel]);
	useEffect(() => {
		const onValueChanged = (funnel: ReportFunnel) => {
			// raise to report level
			fireReport(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
		};
		on(FunnelEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			off(FunnelEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [on, off, fireReport, report]);

	return <>
		<FunnelEnumHandler subject={subject} funnel={funnel}/>
		<FunnelValues>
			<FunnelEditor funnel={funnel} pairJoint={pairJoint}/>
		</FunnelValues>
	</>;
};

export const FunnelItem = (props: { subject: Subject, report: Report, funnel: ReportFunnel }) => {
	const {subject, report, funnel} = props;

	// eslint-disable-next-line
	const column = subject.dataset.columns.find(column => column.columnId == funnel.columnId);

	return <>
		<PropName>{column?.alias} - {ReportFunnelLabels[funnel.type]}</PropName>
		<FunnelItemContainer>
			<FunnelEventBusProvider>
				<FunnelEditorDelegate subject={subject} report={report} funnel={funnel} pairJoint={<PairJoint/>}/>
			</FunnelEventBusProvider>
		</FunnelItemContainer>
	</>;
};