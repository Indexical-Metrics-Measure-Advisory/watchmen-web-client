import {DataPanel} from './index';
import React, {useEffect, useState} from 'react';
import {DataPanels} from '../types';
import {useLayout} from './use-layout';
import {DEFAULT_LAYOUTS} from '../constants';
import {
	DataPanelBody,
	DataPanelBodyDataCell,
	DataPanelBodyDataRow,
	DataPanelBodyDataSeqCell,
	DataPanelBodyHeader,
	DataPanelBodyHeaderCell,
	DataPanelBodyHeaderSeqCell,
	DataPanelBodyNoDataCell,
	HorizontalValue,
	HorizontalValueBar
} from './widgets';
import {fetchMonitorRuleLogs} from '../../../services/data-quality/rules';
import {MonitorRuleLogs} from '../../../services/data-quality/rule-types';
import {RuleDefs} from '../../rule-defs';

export const PeriodicPanel = (props: {
	which: DataPanels;
	title: string;
	period: {
		start: () => string;
		end: () => string;
	}
}) => {
	const {which, title, period: {start, end}} = props;

	const {layout} = useLayout(which);

	const [data, setData] = useState<MonitorRuleLogs>([]);
	useEffect(() => {
		(async () => {
			const logs = await fetchMonitorRuleLogs({
				criteria: {
					startDate: start(),
					endDate: end()
				}
			});
			logs.sort((r1, r2) => r1.count === r2.count ? 0 : (r1.count < r2.count) ? 1 : -1);
			setData(logs);
		})();
		// load data once
		// eslint-disable-next-line
	}, []);

	const format = new Intl.NumberFormat(undefined, {useGrouping: true});

	return <DataPanel which={which} title={title}
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[which]}>
		<DataPanelBody>
			<DataPanelBodyHeader columns="35% 1fr 150px">
				<DataPanelBodyHeaderSeqCell>#</DataPanelBodyHeaderSeqCell>
				<DataPanelBodyHeaderCell>Rule</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Occurred Times</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Last Occurred</DataPanelBodyHeaderCell>
			</DataPanelBodyHeader>
			{data.length === 0
				? <DataPanelBodyDataRow columns="35% 1fr 150px">
					<DataPanelBodyNoDataCell>No rule monitored.</DataPanelBodyNoDataCell>
				</DataPanelBodyDataRow>
				: data.map((row, index) => {
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