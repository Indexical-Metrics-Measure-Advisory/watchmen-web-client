import {useEffect, useState} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';

export const useColumnsDataVisible = (isVisible: () => boolean) => {
	const {on, off} = useSubjectDefEventBus();
	const [visible, setVisible] = useState(isVisible());
	useEffect(() => {
		const onColumnCountChange = () => {
			setVisible(isVisible());
		};
		on(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onColumnCountChange);
		on(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onColumnCountChange);
		return () => {
			off(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onColumnCountChange);
			off(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onColumnCountChange);
		};
	}, [on, off, isVisible]);

	return visible;
};