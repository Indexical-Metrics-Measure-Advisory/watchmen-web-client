import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {AggregateArithmeticLabel} from '../../utils';
import {Bar} from './bar-and-line';
import {InspectionChartsEventBusProvider} from './inspection-charts-event-bus';
import {MeasureSelectionButtons} from './measure-selection-buttons';
import {ChartParams} from './widgets/use-echart';
import {ChartContainer, ChartGroup, ChartGroupButton, ChartGroupButtons, ChartGroupTitle} from './widgets/widgets';

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
export const Chart = (props: ChartParams) => {
	const {arithmetic} = props;

	const [expanded, setExpanded] = useState(true);

	const onToggleExpandClicked = () => setExpanded(!expanded);

	return <InspectionChartsEventBusProvider>
		<ChartGroup expanded={expanded}>
			<ChartGroupTitle>
				<span>{Lang.INDICATOR_WORKBENCH.INSPECTION.VISUALIZATION_LABEL} - {AggregateArithmeticLabel[arithmetic]}</span>
				<ChartGroupButtons>
					<MeasureSelectionButtons {...props}/>
					<ChartGroupButton onClick={onToggleExpandClicked}>
						<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
					</ChartGroupButton>
				</ChartGroupButtons>
			</ChartGroupTitle>
			{expanded
				? <>
					<ChartContainer>
						<Bar {...props}/>
					</ChartContainer>
				</>
				: null}
		</ChartGroup>
	</InspectionChartsEventBusProvider>;
};