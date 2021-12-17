import NavigationBackground from '@/assets/navigation-background.svg';
import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchNavigation, listNavigations, saveNavigation} from '@/services/data/tuples/navigation';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {QueryNavigation} from '@/services/data/tuples/query-navigation-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {noop} from '@/services/utils';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';
import {createNavigation} from '../utils';
import {renderCard} from './card';

const getKeyOfNavigation = (navigation: QueryNavigation) => navigation.navigationId;

// editor never used here
const InternalNavigationQuery = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireNavigation} = useNavigationEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateNavigation = async () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const navigation = createNavigation();
					await saveNavigation(navigation);
					return navigation;
				},
				(navigation: Navigation) => {
					fireNavigation(NavigationEventTypes.TO_EDIT_NAVIGATION, navigation);
				});
		};
		const onDoEditNavigation = async (queryNavigation: QueryNavigation) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {navigation} = await fetchNavigation(queryNavigation.navigationId);
					return {tuple: navigation};
				},
				({tuple}) => {
					fireNavigation(NavigationEventTypes.TO_EDIT_NAVIGATION, tuple as Navigation);
				});
		};
		const onDoSearchNavigation = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listNavigations({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => {
					fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText);
					fireNavigation(NavigationEventTypes.NAVIGATION_SEARCHED, page, searchText);
				});
		};
		// do nothing for save navigation, see edit page
		const onSaveNavigation = noop;

		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateNavigation);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditNavigation);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchNavigation);
		on(TupleEventTypes.SAVE_TUPLE, onSaveNavigation);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateNavigation);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditNavigation);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchNavigation);
			off(TupleEventTypes.SAVE_TUPLE, onSaveNavigation);
		};
	}, [on, off, fire, fireGlobal, fireNavigation]);
	useEffect(() => {
		fireNavigation(NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, (page?: TuplePage<QueryTuple>, searchText?: string) => {
			if (page != null) {
				fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText ?? '');
			}
		});
		// only ask on mount
	}, [fire, fireNavigation]);

	return <TupleWorkbench title={Lang.INDICATOR_WORKBENCH.NAVIGATION.TITLE}
	                       createButtonLabel={Lang.INDICATOR_WORKBENCH.NAVIGATION.CREATE_NAVIGATION} canCreate={true}
	                       searchPlaceholder={Lang.PLAIN.FIND_NAVIGATION_PLACEHOLDER}
	                       tupleLabel={Lang.INDICATOR_WORKBENCH.NAVIGATION.LABEL}
	                       newTupleLabelPrefix={Lang.INDICATOR_WORKBENCH.NAVIGATION.NEW_NAVIGATION_PREFIX}
	                       existingTupleLabelPrefix={Lang.INDICATOR_WORKBENCH.NAVIGATION.EXISTING_NAVIGATION_PREFIX}
	                       tupleImage={NavigationBackground} tupleImagePosition="left 120px"
	                       renderEditor={() => <Fragment/>}
	                       confirmEditButtonLabel={Lang.ACTIONS.CONFIRM}
	                       closeEditButtonLabel={Lang.ACTIONS.CLOSE}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfNavigation}
	/>;
};

export const NavigationQuery = () => {
	return <TupleEventBusProvider>
		<InternalNavigationQuery/>
	</TupleEventBusProvider>;
};