import {useConsoleEventBus} from '@/console/console-event-bus';
import {ConsoleEventTypes} from '@/console/console-event-bus-types';
import {Enum} from '@/services/data/tuples/enum-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {SingleEditor} from './dropdown-editor';

export const EnumEditor = (props: { subject: Subject, report: Report, funnel: ReportFunnel }) => {
	const {subject, report, funnel} = props;

	const {once: onceConsole, on: onConsole, off: offConsole, fire: fireConsole} = useConsoleEventBus();
	const [ticket] = useState(v4());
	const [options, setOptions] = useState<Array<DropdownOption>>([]);
	useEffect(() => {
		const onReplyEnum = (returnTicket: string, enumeration?: Enum) => {
			if (returnTicket !== ticket) {
				return;
			}
			if (!enumeration) {
				return;
			}
			setOptions((enumeration.items || []).map(item => {
				if (item.replaceCode) {
					return {value: item.code, label: `${item.code}|${item.replaceCode} - ${item.label}`};
				} else {
					return {value: item.code, label: `${item.code} - ${item.label}`};
				}
			}));
		};
		onConsole(ConsoleEventTypes.REPLY_ENUM, onReplyEnum);
		return () => {
			offConsole(ConsoleEventTypes.REPLY_ENUM, onReplyEnum);
		};
	}, [onConsole, offConsole]);
	useEffect(() => {
		const columnId = funnel.columnId;
		// eslint-disable-next-line
		const column = subject.dataset.columns.find(column => column.columnId == columnId);
		if (column == null) {
			return;
		}

		if (!isTopicFactorParameter(column.parameter)) {
			// assume parameter is link to a factor, otherwise do nothing
			return;
		}

		const {topicId, factorId} = column.parameter;
		onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
			// eslint-disable-next-line
			const topic = availableTopics.find(topic => topic.topicId == topicId);
			if (topic == null) {
				return;
			}

			// eslint-disable-next-line
			const factor = topic.factors.find(factor => factor.factorId == factorId);
			if (factor == null) {
				return;
			}

			const enumId = factor.enumId;
			if (!enumId) {
				return;
			}

			fireConsole(ConsoleEventTypes.ASK_ENUM, enumId, ticket);
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
	}, [funnel, fireConsole, onceConsole, subject.dataset.columns, ticket]);

	return <>
		<SingleEditor report={report} funnel={funnel} acceptedType={ReportFunnelType.ENUM} options={options}/>
	</>;
};
