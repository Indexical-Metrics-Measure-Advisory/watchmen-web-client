import {Enum, EnumItem} from '@/services/data/tuples/enum-types';
import {ReportFunnel} from '@/services/data/tuples/report-types';
import {FunnelEditor} from '@/widgets/funnel';
import {FunnelEventBusProvider, useFunnelEventBus} from '@/widgets/funnel/funnel-event-bus';
import {FunnelEventTypes} from '@/widgets/funnel/funnel-event-bus-types';
import {ReportFunnelLabels} from '@/widgets/funnel/widgets';
import React, {Fragment, ReactNode, useEffect} from 'react';
import {GroupedFunnel} from './types';
import {FunnelItemContainer, FunnelName, FunnelValues, PairToLabel} from './widgets';

const PairJoint = () => {
	return <PairToLabel>~</PairToLabel>;
};

const FunnelEnumHandler = (props: {
	group: GroupedFunnel;
	enums: Array<Enum>;
	funnel: ReportFunnel;
}) => {
	const {group, enums, funnel} = props;

	const {on, off, fire} = useFunnelEventBus();
	useEffect(() => {
		const onAskEnum = (aFunnel: ReportFunnel, onData: (enumeration: Enum) => void) => {
			if (aFunnel !== funnel) {
				return;
			}

			// eslint-disable-next-line
			const enumeration = enums.find(e => e.enumId == group.funnel.enumId) ?? {
				enumId: group.funnel.enumId, name: '', items: [] as Array<EnumItem>
			} as Enum;

			onData(enumeration);
		};
		on(FunnelEventTypes.ASK_ENUM, onAskEnum);
		return () => {
			off(FunnelEventTypes.ASK_ENUM, onAskEnum);
		};
	}, [fire, on, off, funnel, enums, group.funnel.enumId]);

	return <Fragment/>;
};
const FunnelEditorDelegate = (props: {
	group: GroupedFunnel;
	enums: Array<Enum>;
	funnel: ReportFunnel;
	pairJoint: ReactNode;
	onChange: (group: GroupedFunnel) => void;
}) => {
	const {group, enums, funnel, pairJoint, onChange} = props;

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

	const name = group.funnel.name
		?? (group.funnel.enumId
			// eslint-disable-next-line
			? (enums.find(e => e.enumId == group.funnel.enumId)?.name ?? ReportFunnelLabels[funnel.type])
			: ReportFunnelLabels[funnel.type]);

	return <>
		<FunnelEnumHandler group={group} enums={enums} funnel={funnel}/>
		<FunnelName>{name}</FunnelName>
		<FunnelItemContainer>
			<FunnelValues>
				<FunnelEditor funnel={funnel} pairJoint={pairJoint}/>
			</FunnelValues>
		</FunnelItemContainer>
	</>;
};

export const FunnelEditorWrapper = (props: {
	group: GroupedFunnel;
	enums: Array<Enum>;
	onChange: (group: GroupedFunnel) => void;
}) => {
	const {group, enums, onChange} = props;

	const funnel = {
		type: group.funnel.type,
		enabled: true,
		range: group.funnel.range,
		values: group.funnel.values
	} as ReportFunnel;

	return <FunnelEventBusProvider>
		<FunnelEditorDelegate group={group} enums={enums} funnel={funnel} pairJoint={<PairJoint/>}
		                      onChange={onChange}/>
	</FunnelEventBusProvider>;
};