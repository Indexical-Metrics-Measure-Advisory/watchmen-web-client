import {DefItem, InputItem, ItemType} from '@/services/data/tuples/echarts/echarts-script-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {canUseScript, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {
	isANumber,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	onPercentageChange,
	onTextValueChange,
	validatePercentage
} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {PercentageValue} from '../../settings-widgets/pecentage-value';
import {TextValue} from '../../settings-widgets/text-value';
import {
	isBooleanItem,
	isColorItem,
	isDropdownItem,
	isNumberItem,
	isPercentageItem,
	isSectionItem,
	isTextItem
} from './utils';
import {NoVariable} from './widgets';

const NoVars = () => <NoVariable><span>{Lang.CHART.NO_SCRIPT_VARS}</span></NoVariable>;

const SectionBodyItem = (props: { report: Report; item: InputItem }) => {
	const {report, item} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, report);
	};

	const vars = (chart as ECharts).settings?.scriptVars ?? {};

	if (isNumberItem(item)) {
		return <NumberValue label={item.label}
		                    placeholder={item.placeholder}
		                    unitLabel={item.unit}
		                    value={vars[item.key]}
		                    defaultValue={item.defaultValue}
		                    validate={isANumber}
		                    onValueChange={onNumberChange({
			                    report,
			                    chart,
			                    prop: `scriptVars.${item.key}` as any,
			                    done: onValueChange
		                    })}/>;
	} else if (isPercentageItem(item)) {
		return <PercentageValue label={item.label}
		                        placeholder={item.placeholder}
		                        unitLabel="%"
		                        value={vars[item.key]}
		                        defaultValue={item.defaultValue}
		                        validate={validatePercentage}
		                        onValueChange={onPercentageChange({
			                        report,
			                        chart,
			                        prop: `scriptVars.${item.key}` as any,
			                        done: onValueChange
		                        })}/>;
	} else if (isBooleanItem(item)) {
		return <BooleanValue label={item.label}
		                     value={vars[item.key]}
		                     defaultValue={item.defaultValue}
		                     onValueChange={onBooleanChange({
			                     report,
			                     chart,
			                     prop: `scriptVars.${item.key}` as any,
			                     done: onValueChange
		                     })}/>;
	} else if (isTextItem(item)) {
		return <TextValue label={item.label}
		                  placeholder={item.placeholder}
		                  value={vars[item.key]}
		                  defaultValue={item.defaultValue}
		                  onValueChange={onTextValueChange({
			                  report,
			                  chart,
			                  prop: `scriptVars.${item.key}` as any,
			                  done: onValueChange
		                  })}/>;
	} else if (isColorItem(item)) {
		return <ColorValue label={item.label}
		                   value={vars[item.key]}
		                   defaultValue={item.defaultValue}
		                   onValueChange={onColorChange({
			                   report,
			                   chart,
			                   prop: `scriptVars.${item.key}` as any,
			                   done: onValueChange
		                   })}/>;
	} else if (isDropdownItem(item)) {
		return <DropdownValue label={item.label}
		                      placeholder={item.placeholder}
		                      value={vars[item.key]}
		                      defaultValue={item.defaultValue}
		                      options={item.options}
		                      onValueChange={onDropdownValueChange({
			                      report,
			                      chart,
			                      prop: `scriptVars.${item.key}` as any,
			                      done: onValueChange
		                      })}/>;
	}

	return <Fragment/>;
};

const Section = (props: { report: Report; items: Array<DefItem> }) => {
	const {report, items} = props;

	const [first, ...rest] = items;
	if (isSectionItem(first)) {
		return <>
			<TabBodySectionTitle>{first.label}</TabBodySectionTitle>
			<TabBodySectionBody>
				{rest.map(item => {
					return <SectionBodyItem report={report} item={item as InputItem} key={(item as InputItem).key}/>;
				})}
			</TabBodySectionBody>
		</>;
	} else {
		return <TabBodySectionBody>
			{items.map(item => {
				return <SectionBodyItem report={report} item={item as InputItem} key={(item as InputItem).key}/>;
			})}
		</TabBodySectionBody>;
	}
};

export const EChartsScriptVars = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	useChartType({report});

	if (!isEChart(chart) || !canUseScript(chart)) {
		return null;
	}

	const defs = (chart.settings?.scriptVarsDefs ?? '').trim();
	if (defs.length === 0) {
		return <NoVars/>;
	}

	const items: Array<DefItem> = (() => {
		try {
			// eslint-disable-next-line
			return eval(defs);
		} catch (e) {
			console.error(e);
			return [];
		}
	})();

	if (!Array.isArray(items) || items.length === 0) {
		return <NoVars/>;
	}

	if (items.filter(item => !!item).filter(item => item.type !== ItemType.SECTION).length === 0) {
		return <NoVars/>;
	}

	const renderItems: Array<Array<DefItem>> = items.filter(item => !!item).reduce((items, item) => {
		if (item != null) {
			if (isSectionItem(item)) {
				items.push([item]);
			} else {
				if (items.length === 0) {
					items.push([]);
				}
				items[items.length - 1].push(item);
			}
		}
		return items;
	}, [] as Array<Array<DefItem>>).filter(items => {
		return items.length !== 1 || !isSectionItem(items[0]);
	});

	if (renderItems.length === 0) {
		return <NoVars/>;
	}

	return <TabBodySection>
		{renderItems.map(items => {
			return <Section report={report} items={items} key={v4()}/>;
		})}
	</TabBodySection>;
};