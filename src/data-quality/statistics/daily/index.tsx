import {DataPanel} from '../data-panel';
import React from 'react';
import {DataPanels} from '../types';
import {useLayout} from '../data-panel/use-layout';
import {DEFAULT_LAYOUTS} from '../constants';
import {
	DataPanelBody,
	DataPanelBodyDataCell,
	DataPanelBodyDataRow,
	DataPanelBodyDataSeqCell,
	DataPanelBodyHeader,
	DataPanelBodyHeaderCell,
	DataPanelBodyHeaderSeqCell,
	HorizontalValue,
	HorizontalValueBar
} from '../data-panel/widgets';
import {getCurrentTime} from '../../../services/utils';

export const DailyPanel = () => {
	const {layout} = useLayout(DataPanels.DAILY);

	// TODO retrieve data
	const data = new Array(100).fill(1).map(() => {
		return {
			name: 'Value breaks monotone increasing',
			value: Math.round(Math.random() * 10000),
			lastOccurred: getCurrentTime()
		};
	}).sort((r1, r2) => r1.value === r2.value ? 0 : (r1.value < r2.value) ? 1 : -1);
	const format = new Intl.NumberFormat(undefined, {useGrouping: true});

	return <DataPanel which={DataPanels.DAILY} title="Daily"
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[DataPanels.DAILY]}>
		<DataPanelBody>
			<DataPanelBodyHeader columns="35% 1fr 150px">
				<DataPanelBodyHeaderSeqCell>#</DataPanelBodyHeaderSeqCell>
				<DataPanelBodyHeaderCell>Rule</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Occurred Times</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Last Occurred</DataPanelBodyHeaderCell>
			</DataPanelBodyHeader>
			{data.map((row, index) => {
				return <DataPanelBodyDataRow columns="35% 1fr 150px" key={index}>
					<DataPanelBodyDataSeqCell>{index + 1}</DataPanelBodyDataSeqCell>
					<DataPanelBodyDataCell>{row.name}</DataPanelBodyDataCell>
					<DataPanelBodyDataCell>
						<HorizontalValueBar value={row.value / 100}/>
						<HorizontalValue>{format.format(row.value)}</HorizontalValue>
					</DataPanelBodyDataCell>
					<DataPanelBodyDataCell>{row.lastOccurred}</DataPanelBodyDataCell>
				</DataPanelBodyDataRow>;
			})}
		</DataPanelBody>
	</DataPanel>;
};