import React from 'react';
import { Lang } from '../../../../../../../langs';
import { Report } from '../../../../../../../services/tuples/report-types';
import DefaultTheme from '../../../../../../../theme/default-theme';
import { PropName, PropValue } from '../../settings-widgets/widgets';
import { ChartColorPicker } from '../widgets';
import { useColor } from './use-color';

export const BackgroundColor = (props: { report: Report }) => {
	const { report } = props;
	const { color, onColorChange } = useColor({
		report,
		propName: 'backgroundColor',
		defaultColor: DefaultTheme.bgColor
	});

	return <>
		<PropName>{Lang.CHART.BACKGROUND_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker color={color} onChange={onColorChange}/>
		</PropValue>
	</>;
};