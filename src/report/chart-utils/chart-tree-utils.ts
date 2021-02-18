import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { TREE } from '../../services/tuples/chart-def/chart-tree';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

export class ChartTreeUtils extends DefaultChartUtils {
	constructor() {
		super(TREE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		return {
			color: BASE_COLORS_24,
			tooltip: {
				trigger: 'item'
			},
			series: [ {
				type: 'tree',
				top: '2%',
				left: '2%',
				bottom: '2%',
				right: '2%',
				symbolSize: 8,
				label: {
					position: 'right',
					verticalAlign: 'middle',
					align: 'left'
				},
				leaves: {
					label: {
						position: 'left',
						verticalAlign: 'middle',
						align: 'right'
					}
				},
				expandAndCollapse: true,
				data: this.buildTreeData(report, dataset)
			} ]
		};
	}
}