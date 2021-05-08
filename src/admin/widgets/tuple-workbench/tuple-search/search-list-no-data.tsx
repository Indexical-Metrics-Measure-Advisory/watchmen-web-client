import React, {useEffect, useState} from 'react';
import {DataPage} from '../../../../services/query/data-page';
import {QueryTuple} from '../../../../services/tuples/tuple-types';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes} from '../tuple-event-bus-types';
import {NoData} from './widgets';

export const SearchListNoData = <QT extends QueryTuple>() => {
	const {on, off} = useTupleEventBus();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onTupleSearched = (page: DataPage<QT>) => {
			const {data} = page;
			if (!data || data.length === 0) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};
		on(TupleEventTypes.TUPLE_SEARCHED, onTupleSearched);
		return () => {
			off(TupleEventTypes.TUPLE_SEARCHED, onTupleSearched);
		};
	}, [on, off]);

	return <NoData visible={visible}>No matched data.</NoData>;
};