import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button} from '../../basic/button';
import {ICON_DELETE} from '../../basic/constants';
import {DropdownOption} from '../../basic/types';
import {useForceUpdate} from '../../basic/utils';
import {Lang} from '../../langs';
import {DropdownValueEditor} from '../../value-editor/dropdown-value-editor';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {useRange} from '../use-range';
import {EnumValue, MultipleEnumValues} from './widgets';

export const RangeEnumEditor = (props: { funnel: ReportFunnel, options: Array<DropdownOption> }) => {
	const {funnel, options} = props;

	const {fire} = useFunnelEventBus();
	const forceUpdate = useForceUpdate();
	useRange(funnel);

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
			fire(FunnelEventTypes.VALUE_CHANGED, funnel);
		}
		forceUpdate();
	};
	const onValueRemove = (value: string) => () => {
		// eslint-disable-next-line
		funnel.values = funnel.values?.filter(v => v != value);
		fire(FunnelEventTypes.VALUE_CHANGED, funnel);
		forceUpdate();
	};

	const values = (funnel.values || []).filter(value => value);
	const valueMap = values.reduce((map, value) => {
		map[`${value}`] = true;
		return map;
	}, {} as Record<string, true>);
	const availableOptions = [
		{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE},
		...options.filter(option => !valueMap[`${option.value}`])
	];

	return <>
		<MultipleEnumValues>
			{values.length === 0
				? <EnumValue>{Lang.CHART.NO_ENUM_FUNNEL_VALUE}</EnumValue>
				: null}
			{values.map(value => {
				// eslint-disable-next-line
				const option = options.find(option => option.value == value);
				return <EnumValue key={value}>
					<span>{option?.label}</span>
					<Button onClick={onValueRemove(value!)}>
						<FontAwesomeIcon icon={ICON_DELETE}/>
					</Button>
				</EnumValue>;
			})}
		</MultipleEnumValues>
		<DropdownValueEditor value={''} onValueChange={onValueChange} options={availableOptions}/>
	</>;
};