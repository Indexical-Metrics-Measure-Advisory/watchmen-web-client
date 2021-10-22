import {ICON_MAXIMIZE_PANEL, ICON_MINIMIZE_PANEL, ICON_RESTORE_PANEL} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import React, {ReactNode} from 'react';
import {useStatisticsEventBus} from '../statistics-event-bus';
import {StatisticsEventTypes} from '../statistics-event-bus-types';
import {DataPanelLayout, DataPanelResize, DataPanels} from '../types';
import {
	DataPanelContainer,
	DataPanelHeader,
	DataPanelHeaderButton,
	DataPanelHeaderButtons,
	DataPanelHeaderTitle
} from './widgets';

const sameLayout = (l1: DataPanelLayout, l2: DataPanelLayout): boolean => {
	return l1.column === l2.column
		&& l1.spanColumn === l2.spanColumn
		&& l1.row === l2.row
		&& l1.spanRow === l2.spanRow;
};

export interface AdditionalDataPanelHeaderButton {
	iconProps: FontAwesomeIconProps;
	tooltip: string;
	action: () => void;
}

export const DataPanel = (props: {
	which: DataPanels;
	title: string;
	layout: DataPanelLayout;
	defaultLayout: DataPanelLayout;
	buttons?: Array<AdditionalDataPanelHeaderButton>;
	children?: ReactNode;
}) => {
	const {which, title, layout, defaultLayout, buttons = [], children} = props;

	const {fire} = useStatisticsEventBus();

	const minimize = () => fire(StatisticsEventTypes.RESIZE_PANEL, which, DataPanelResize.MINIMIZE);
	const maximize = () => fire(StatisticsEventTypes.RESIZE_PANEL, which, DataPanelResize.MAXIMIZE);
	const restore = () => fire(StatisticsEventTypes.RESIZE_PANEL, which, DataPanelResize.RESTORE);

	const hideRestore = sameLayout(layout, defaultLayout);
	const hideMin = layout.spanRow === 1 || layout.spanColumn === 1;
	const hideMax = layout.spanRow === 3 && layout.spanColumn === 3;

	return <DataPanelContainer layout={layout}>
		<DataPanelHeader layout={layout}>
			<DataPanelHeaderTitle layout={layout}>{title}</DataPanelHeaderTitle>
			<DataPanelHeaderButtons layout={layout}>
				{buttons.map(button => {
					return <DataPanelHeaderButton tooltip={{label: button.tooltip, alignment: TooltipAlignment.CENTER}}
					                              onClick={button.action}
					                              key={button.tooltip}>
						<FontAwesomeIcon {...button.iconProps}/>
					</DataPanelHeaderButton>;
				})}
				{!hideMin
					? <DataPanelHeaderButton tooltip={{label: 'Minimize', alignment: TooltipAlignment.CENTER}}
					                         onClick={minimize}>
						<FontAwesomeIcon icon={ICON_MINIMIZE_PANEL}/>
					</DataPanelHeaderButton>
					: null}
				{!hideRestore
					? <DataPanelHeaderButton tooltip={{label: 'Restore', alignment: TooltipAlignment.CENTER}}
					                         onClick={restore}>
						<FontAwesomeIcon icon={ICON_RESTORE_PANEL}/>
					</DataPanelHeaderButton>
					: null}
				{!hideMax
					? <DataPanelHeaderButton tooltip={{label: 'Maximize', alignment: TooltipAlignment.CENTER}}
					                         onClick={maximize}>
						<FontAwesomeIcon icon={ICON_MAXIMIZE_PANEL}/>
					</DataPanelHeaderButton>
					: null}
			</DataPanelHeaderButtons>
		</DataPanelHeader>
		{children}
	</DataPanelContainer>;
};