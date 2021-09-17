import dayjs from 'dayjs';
import React from 'react';
import {PeriodicPanel} from '../data-panel/periodic-data-panel';
import {DataPanels} from '../types';

export const DailyPanel = () => {
	const getStartDate = () => dayjs().startOf('date').format('YYYY/MM/DD HH:mm:ss.SSS');
	const getEndDate = () => dayjs().endOf('date').format('YYYY/MM/DD HH:mm:ss.SSS');

	return <PeriodicPanel which={DataPanels.DAILY} title="Daily" period={{start: getStartDate, end: getEndDate}}/>;
};