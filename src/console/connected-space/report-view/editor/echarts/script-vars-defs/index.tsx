import {canUseScript, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import {getCurrentTheme} from '@/widgets/theme/theme-wrapper';
import MonacoEditor, {loader} from '@monaco-editor/react';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';

loader.config({
	paths: {vs: `${process.env.REACT_APP_WEB_CONTEXT === '/' ? '' : process.env.REACT_APP_WEB_CONTEXT}/static/monaco-editor@0.29.1/min/vs`}
	// 'vs/nls': {availableLanguages: {'*': ''}}
});

const ScriptVariablesTemplate = `// Follow script variables template as below,
// 1. Script must follow the es5 syntax; asynchronized function is not allowed,
// 2. Define an anonymous and self-executing function, returns a variables configuration option JSON object,
// 3. Use "const" or "let" to define variables. never use "var", it will expose variables to global and leads memory leak,
// 4. There is a tab to input for end user, values of variables will be passed to script via "options",
// 5. If you see this means there is no script defined, simply add a white space anywhere to see what happens.

(() => {
	// here is a sample
	// your code starts
	return [
		{type: 'section', label: 'Section 1'},
		// unit, placeholder is optional
		{key: 'var1', type: 'number', placeholder: 'Number Variable...', label: 'V1', unit: 'px'},
		// placeholder is optional
		{key: 'var2', type: 'percentage', placeholder: 'Percentage Variable...', label: 'V2'},
		{key: 'var3', type: 'boolean', label: 'V3'},
		{key: 'var4', type: 'text', placeholder: 'Text Variable...', label: 'V4'},
		{key: 'var5', type: 'color', label: 'V5'},
		{key: 'var6', type: 'dropdown', placeholder: 'Dropdown Variable...', label: 'V6', options: [{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]},
	];
	// your code ends
})();
`;

// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroverrideservices.html
export const EChartsScriptVarsDefs = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseScript(chart)) {
		return null;
	}

	const onValueChange = (value?: string) => {
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.scriptVarsDefs = value;
		fire(ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, report);
	};

	const variables = chart.settings?.scriptVarsDefs;

	return <MonacoEditor language="javascript"
	                     value={variables || ScriptVariablesTemplate}
	                     onChange={onValueChange}
	                     theme={getCurrentTheme().codeEditorTheme}
	                     loading={Lang.PLAIN.LOADING}
	                     options={{
		                     minimap: {enabled: false}
	                     }}/>;
};