import styled from 'styled-components';
import { COUNT, CountChartSettings } from '../../services/tuples/chart-def/chart-count';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

const CountContainer = styled.div.attrs({ 'data-widget': 'chart-count' })`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	width           : 100%;
	height          : 100%;
`;

export class ChartCountUtils extends DefaultChartUtils {
	constructor() {
		super(COUNT);
	}

	shouldHasDimension(): boolean {
		return false;
	}

	shouldHasIndicator(): boolean {
		return false;
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		let value: string | number = (dataset.data[0][0] as number | null | undefined) || 0;
		if (isNaN(value)) {
			value = 0;
		}

		const { chart: { settings } } = report;
		const {
			countText: {
				font = {},
				formatUseGrouping,
				textDecoration
			} = {}
		} = (settings || {}) as CountChartSettings;
		const { family: fontFamily, style: fontStyle, color, weight: fontWeight, size: fontSize } = font;

		if (formatUseGrouping) {
			value = new Intl.NumberFormat(undefined, { useGrouping: true }).format(value);
		}

		return <CountContainer>
			<span style={{
				textDecoration,
				fontFamily,
				fontStyle,
				color,
				fontWeight: fontWeight as any,
				fontSize
			}}>{value}</span>
		</CountContainer>;
	}
}
