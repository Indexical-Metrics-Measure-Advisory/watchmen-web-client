import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {AggregateArithmeticLabel} from '../../utils';
import {Chart} from './chart';
import {buildChartUsages} from './chart-utils';
import {InspectionChartsEventBusProvider, useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {ChartParams} from './types';
import {UsageSelectionButtons} from './usage-selection-buttons';
import {ChartGroup, ChartGroupButton, ChartGroupButtons, ChartGroupTitle} from './widgets/widgets';

// use first aggregate arithmetic to render the thumbnails
// supporting first 3 types: bar/line/pie
// 1. bar/line:
// 1.1. bucket: bucket as x-axis, value as y-axis
// 1.2. time group: time as x-axis, value as y-axis
// 1.3. bucket + time group: time as x-axis, bucket + value as y-axis
// 1.4. multiple time filter: apply increment ratio
// 2. pie:
// 2.1 bucket: simple pie
// 2.2 time group: simple pie
// 2.3 bucket + time group: sunburst, first is time group, secondary is bucket, and value

const ExpansionButton = () => {
	const {fire} = useInspectionChartsEventBus();
	const [expanded, setExpanded] = useState(true);

	const onToggleExpandClicked = () => {
		fire(InspectionChartsEventTypes.TOGGLE_PANEL, !expanded);
		setExpanded(!expanded);
	};

	return <ChartGroupButton onClick={onToggleExpandClicked}>
		<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
	</ChartGroupButton>;
};

const AllCharts = (props: ChartParams) => {
	const {inspection, arithmetic} = props;

	const {on, off} = useInspectionChartsEventBus();
	const [expanded, setExpanded] = useState(true);
	useEffect(() => {
		const onTogglePanel = (visible: boolean) => {
			setExpanded(visible);
		};
		on(InspectionChartsEventTypes.TOGGLE_PANEL, onTogglePanel);
		return () => {
			off(InspectionChartsEventTypes.TOGGLE_PANEL, onTogglePanel);
		};
	}, [on, off]);

	if (!expanded) {
		return null;
	}

	const usages = buildChartUsages(inspection, arithmetic);

	return <>
		{usages.map(usage => {
			return <Chart {...props} usage={usage} usages={usages} key={v4()}/>;
		})}
	</>;
};

export const ArithmeticChart = (props: ChartParams) => {
	const {arithmetic} = props;

	return <InspectionChartsEventBusProvider>
		<ChartGroup>
			<ChartGroupTitle>
				<span>{Lang.INDICATOR_WORKBENCH.INSPECTION.VISUALIZATION_LABEL} - {AggregateArithmeticLabel[arithmetic]}</span>
				<ChartGroupButtons>
					<UsageSelectionButtons {...props}/>
					<ExpansionButton/>
				</ChartGroupButtons>
			</ChartGroupTitle>
			<AllCharts {...props}/>
		</ChartGroup>
	</InspectionChartsEventBusProvider>;
};