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
			// raise to report level
			// fireReport(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, funnel);
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
		{/*<FunnelEnumHandler subject={subject} funnel={funnel}/>*/}
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