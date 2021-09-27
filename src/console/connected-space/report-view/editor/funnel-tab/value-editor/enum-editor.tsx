import {Enum} from '@/services/data/tuples/enum-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Button} from '@/widgets/basic/button';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes} from '../../../../..//console-event-bus-types';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../../console-event-bus';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {useFunnelRange} from '../use-funnel-range';
import {EnumValue, MultipleEnumValues} from '../widgets';
import {SingleEditor} from './dropdown-editor';

const RangeEnumEditor = (props: { report: Report, funnel: ReportFunnel, options: Array<DropdownOption> }) => {
	const {report, funnel, options} = props;

	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.ENUM || !funnel.range) {
		return null;
	}

	const onValueChange = (option: DropdownOption) => {
		const value = option.value;
		if (value === '') {
			return;
		}

		funnel.values = funnel.values || [];
		if (!funnel.values.includes(value)) {
			funnel.values = [...funnel.values, value];
			fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
		}
		forceUpdate();
	};
	const onValueRemove = (value: string) => () => {
		funnel.values = funnel.values?.filter(v => v != value);
		fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
		forceUpdate();
	};

	const values = (funnel.values || []).filter(value => value);
	const valueMap = values.reduce((map, value) => {
		map[`${value}`] = true;
		return map;
	}, {} as { [key in string]: true });
	const availableOptions = options.filter(option => !valueMap[`${option.value}`]);

	return <>
		<MultipleEnumValues>
			{values.length === 0
				? <EnumValue>{Lang.CHART.NO_ENUM_FUNNEL_VALUE}</EnumValue>
				: null}
			{values.map(value => {
				const option = options.find(option => option.value == value);
				return <EnumValue key={value}>
					<span>{option?.label}</span>
					<Button onClick={onValueRemove(value!)}>
						<FontAwesomeIcon icon={ICON_DELETE}/>
					</Button>
				</EnumValue>;
			})}
		</MultipleEnumValues>
		<DropdownValue value={''}
		               onValueChange={onValueChange}
		               options={[{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE}, ...availableOptions]}/>
	</>;
};

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
	}, [onConsole, offConsole, ticket]);
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
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
	}, [funnel, fireConsole, onceConsole, subject.dataset.columns, ticket]);

	return <>
		<SingleEditor report={report} funnel={funnel} acceptedType={ReportFunnelType.ENUM} options={options}/>
		<RangeEnumEditor report={report} funnel={funnel} options={options}/>
	</>;
};
