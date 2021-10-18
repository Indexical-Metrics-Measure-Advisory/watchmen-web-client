import {Enum} from '@/services/data/tuples/enum-types';
import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {DropdownOption} from '../../basic/types';
import {SingleEditor} from '../dropdown/single';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {RangeEnumEditor} from './range';

export const EnumEditor = (props: { funnel: ReportFunnel }) => {
	const {funnel} = props;

	const {once} = useFunnelEventBus();
	const [ticket] = useState(v4());
	const [options, setOptions] = useState<Array<DropdownOption>>([]);
	useEffect(() => {
		once(FunnelEventTypes.REPLY_ENUM, (aFunnel: ReportFunnel, returnTicket: string, enumeration?: Enum) => {
			if (aFunnel !== funnel || returnTicket !== ticket) {
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
		}).fire(FunnelEventTypes.ASK_ENUM, funnel, ticket);
	}, [once, ticket, funnel]);

	return <>
		<SingleEditor funnel={funnel} acceptedType={ReportFunnelType.ENUM} options={options}/>
		<RangeEnumEditor funnel={funnel} options={options}/>
	</>;
};