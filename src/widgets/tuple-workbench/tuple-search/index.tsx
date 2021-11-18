import {QueryTuple} from '@/services/data/tuples/tuple-types';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes} from '../tuple-event-bus-types';
import {SearchList} from './search-list';
import {SearchListNoData} from './search-list-no-data';
import {TupleSearchContainer} from './widgets';

export const TupleSearch = <QT extends QueryTuple>(props: {
	renderCard: (item: QT) => ReactNode;
	getKeyOfTuple: (item: QT) => string;
}) => {
	const {renderCard, getKeyOfTuple} = props;

	const {on, off} = useTupleEventBus();
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const onHide = () => setVisible(false);
		const onShow = () => setVisible(true);
		on(TupleEventTypes.TUPLE_CREATED, onHide);
		on(TupleEventTypes.TUPLE_LOADED, onHide);
		on(TupleEventTypes.TUPLE_SEARCHED, onShow);
		on(TupleEventTypes.TUPLE_EDIT_DONE, onShow);
		return () => {
			off(TupleEventTypes.TUPLE_CREATED, onHide);
			off(TupleEventTypes.TUPLE_LOADED, onHide);
			off(TupleEventTypes.TUPLE_SEARCHED, onShow);
			off(TupleEventTypes.TUPLE_EDIT_DONE, onShow);
		};
	}, [on, off]);

	return <TupleSearchContainer visible={visible}>
		<SearchListNoData/>
		<SearchList renderCard={renderCard} getKeyOfTuple={getKeyOfTuple}/>
	</TupleSearchContainer>;
};