import React from 'react';
import {DataPanels} from '../types';
import {PeriodicPanel} from '../data-panel/periodic-data-panel';
import dayjs from 'dayjs';

export const DailyPanel = () => {
	const getStartDate = () => dayjs().startOf('date').format('YYYY/MM/DD HH:mm:ss.SSS');
	const getEndDate = () => dayjs().endOf('date').format('YYYY/MM/DD HH:mm:ss.SSS');

	return <PeriodicPanel which={DataPanels.DAILY} title="Daily" period={{start: getStartDate, end: getEndDate}}/>;
};