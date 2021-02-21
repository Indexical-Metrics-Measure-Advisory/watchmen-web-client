import React from 'react';
import { Lang } from '../../../../../../../langs';
import { Report } from '../../../../../../../services/tuples/report-types';
import DefaultTheme from '../../../../../../../theme/default-theme';
import { PropName, PropValue } from '../../settings-widgets/widgets';
import { ChartColorPicker } from '../widgets';
import { useColor } from './use-color';

export const BorderColor = (props: { report: Report }) => {
	const { report } = props;
	const { color, onColorChange } = useColor({
		report,
		propName: 'borderColor',
		defaultColor: DefaultTheme.borderColor
	});

	return <>
		<PropName>{Lang.CHART.BORDER_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker color={color} onChange={onColorChange}/>
		</PropValue>
	</>;
};