import {useConsoleEventBus} from '@/console/console-event-bus';
import {ConsoleEventTypes} from '@/console/console-event-bus-types';
import {Enum, EnumItem} from '@/services/data/tuples/enum-types';
import {ReportFunnel} from '@/services/data/tuples/report-types';
import {FunnelEditor} from '@/widgets/funnel';
import {FunnelEventBusProvider, useFunnelEventBus} from '@/widgets/funnel/funnel-event-bus';
import {FunnelEventTypes} from '@/widgets/funnel/funnel-event-bus-types';
import {ReportFunnelLabels} from '@/widgets/funnel/widgets';
import React, {ReactNode, useEffect} from 'react';
import {GroupedFunnel} from './types';
import {FunnelItemContainer, FunnelName, FunnelValues, PairToLabel} from './widgets';

const PairJoint = () => {
	return <PairToLabel>~</PairToLabel>;
};

const FunnelEnumHandler = (props: { enumId: string; funnel: ReportFunnel }) => {
	const {enumId, funnel} = props;

	const {on: onConsole, off: offConsole, fire: fireConsole} = useConsoleEventBus();
	const {on, off, fire} = useFunnelEventBus();
	useEffect(() => {
		const onReplyEnum = (returnTicket: string, enumeration?: Enum) => {
			if (!enumeration) {
				// reply a mock one with no items
				fire(FunnelEventTypes.REPLY_ENUM, funnel, returnTicket, {
					enumId, name: '', items: [] as Array<EnumItem>
				} as Enum);
			} else {
				// bridge event to funnel bus
				fire(FunnelEventTypes.REPLY_ENUM, funnel, returnTicket, enumeration);
			}
		};
		const onAskEnum = (aFunnel: ReportFunnel, ticket: string) => {
			if (aFunnel !== funnel) {
				return;
			}

			fireConsole(ConsoleEventTypes.ASK_ENUM, enumId, ticket);
		};
		onConsole(ConsoleEventTypes.REPLY_ENUM, onReplyEnum);
		on(FunnelEventTypes.ASK_ENUM, onAskEnum);
		return () => {
			offConsole(ConsoleEventTypes.REPLY_ENUM, onReplyEnum);
			off(FunnelEventTypes.ASK_ENUM, onAskEnum);
		};
	}, [fire, on, off, fireConsole, onConsole, offConsole, enumId, funnel]);

	return <></>;
};

const FunnelEditorDelegate = (props: {
	group: GroupedFunnel;
	funnel: ReportFunnel;
	pairJoint: ReactNode;
	onChange: (group: GroupedFunnel) => void;
}) => {
	const {group, funnel, pairJoint, onChange} = props;

	const {on, off} = useFunnelEventBus();
	useEffect(() => {
		const onValueChanged = (aFunnel: ReportFunnel) => {
			if (aFunnel !== funnel) {
				return;
			}

			group.funnel.values = funnel.values;
			onChange(group);
		};
		on(FunnelEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			off(FunnelEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [on, off, group, funnel, onChange]);

	return <>
		{group.funnel.enumId ? <FunnelEnumHandler enumId={group.funnel.enumId} funnel={funnel}/> : null}
		<FunnelValues>
			<FunnelEditor funnel={funnel} pairJoint={pairJoint}/>
		</FunnelValues>
	</>;
};

export const FunnelEditorWrapper = (props: {
	group: GroupedFunnel;
	name?: string;
	onChange: (group: GroupedFunnel) => void;
}) => {
	const {group, name, onChange} = props;

	const funnel = {
		type: group.funnel.type,
		enabled: true,
		range: group.funnel.range,
		values: group.funnel.values
	} as ReportFunnel;

	return <>
		<FunnelName>{name ?? ReportFunnelLabels[funnel.type]}</FunnelName>
		<FunnelItemContainer>
			<FunnelEventBusProvider>
				<FunnelEditorDelegate group={group} funnel={funnel} pairJoint={<PairJoint/>} onChange={onChange}/>
			</FunnelEventBusProvider>
		</FunnelItemContainer>
	</>;
};