import React from 'react';
import {DataPanels} from '../types';
import dayjs from 'dayjs';
import {PeriodicPanel} from '../data-panel/periodic-data-panel';

export const WeeklyPanel = () => {
	const getStartDate = () => dayjs().startOf('week').format('YYYY/MM/DD HH:mm:ss.SSS');
	const getEndDate = () => dayjs().endOf('date').format('YYYY/MM/DD HH:mm:ss.SSS');

	return <PeriodicPanel which={DataPanels.WEEKLY} title="Weekly" period={{start: getStartDate, end: getEndDate}}/>;
};