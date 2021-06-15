import {DataPanel} from '../data-panel';
import React, {useEffect, useState} from 'react';
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
import {fetchMonitorRuleLogs} from '../../../services/data-quality/rules';
import {MonitorRuleLogs} from '../../../services/data-quality/rule-types';
import {RuleDefs} from '../../rule-defs';
import dayjs from 'dayjs';

export const DailyPanel = () => {
	const {layout} = useLayout(DataPanels.DAILY);

	const [data, setData] = useState<MonitorRuleLogs>([]);
	useEffect(() => {
		(async () => {
			const logs = await fetchMonitorRuleLogs({
				criteria: {
					startDate: dayjs().startOf('date').format('YYYY/MM/DD HH:mm:ss.SSS'),
					endDate: dayjs().endOf('date').format('YYYY/MM/DD HH:mm:ss.SSS')
				}
			});
			logs.sort((r1, r2) => r1.count === r2.count ? 0 : (r1.count < r2.count) ? 1 : -1);
			setData(logs);
		})();
	}, []);

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
					<DataPanelBodyDataCell>{RuleDefs[row.ruleCode].name}</DataPanelBodyDataCell>
					<DataPanelBodyDataCell>
						<HorizontalValueBar value={row.count / 100}/>
						<HorizontalValue>{format.format(row.count)}</HorizontalValue>
					</DataPanelBodyDataCell>
					<DataPanelBodyDataCell>{row.lastOccurredTime}</DataPanelBodyDataCell>
				</DataPanelBodyDataRow>;
			})}
		</DataPanelBody>
	</DataPanel>;
};