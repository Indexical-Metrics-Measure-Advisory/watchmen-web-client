import {TuplePage} from '@/services/data/query/tuple-page';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes} from '../tuple-event-bus-types';
import {
	TupleSearchList,
	TupleSearchListPagination,
	TupleSearchListPaginationButton,
	TupleSearchListPaginationPointer
} from './widgets';

interface State<QT extends QueryTuple> {
	visible: boolean;
	page?: TuplePage<QT>;
	search: string;
}

export const SearchList = <QT extends QueryTuple>(props: {
	renderCard: (item: QT) => ReactNode;
	getKeyOfTuple: (item: QT) => string;
}) => {
	const {renderCard, getKeyOfTuple} = props;

	const {on, off, fire} = useTupleEventBus();
	const [state, setState] = useState<State<QT>>({visible: false, search: ''});
	useEffect(() => {
		const onTupleSearched = (page: TuplePage<QT>, searchText: string) => {
			if (page.data && page.data.length > 0) {
				setState({visible: true, page, search: searchText});
			} else {
				setState({visible: false, search: ''});
			}
		};
		on(TupleEventTypes.TUPLE_SEARCHED, onTupleSearched);
		return () => {
			off(TupleEventTypes.TUPLE_SEARCHED, onTupleSearched);
		};
	}, [on, off]);

	const onPreviousPageClicked = () => {
		const {pageNumber} = state.page!;
		if (pageNumber > 1) {
			fire(TupleEventTypes.DO_SEARCH_TUPLE, state.search || '', pageNumber - 1);
		}
	};
	const onNextPageClicked = () => {
		const {pageNumber, pageCount} = state.page!;
		if (pageNumber < pageCount) {
			fire(TupleEventTypes.DO_SEARCH_TUPLE, state.search || '', pageNumber + 1);
		}
	};

	const show = state.visible && state.page!.data.length > 0;
	const hasPreviousPage = show && state.page!.pageNumber !== 1;
	const hasNextPage = show && state.page!.pageNumber < state.page!.pageCount;

	return <TupleSearchList>
		{show
			? state.page!.data.map(tuple => {
				return <Fragment key={getKeyOfTuple(tuple)}>
					{renderCard(tuple)}
				</Fragment>;
			})
			: null
		}
		{show
			? <TupleSearchListPagination>
				<TupleSearchListPaginationButton visible={hasPreviousPage} onClick={onPreviousPageClicked}>
					Previous Page
				</TupleSearchListPaginationButton>
				<TupleSearchListPaginationPointer>
					#{state.page!.pageNumber} of {state.page!.pageCount} Pages
				</TupleSearchListPaginationPointer>
				<TupleSearchListPaginationButton visible={hasNextPage} onClick={onNextPageClicked}>
					Next Page
				</TupleSearchListPaginationButton>
			</TupleSearchListPagination>
			: null}
	</TupleSearchList>;
};