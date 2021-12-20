import {Router} from '@/routes/types';
import {toNavigationEdit} from '@/routes/utils';
import {TuplePage} from '@/services/data/query/tuple-page';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {QueryNavigation} from '@/services/data/tuples/query-navigation-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

interface PageData {
	loaded: boolean;
	data?: TuplePage<QueryTuple>;
	searchText?: string;
}

export const NavigationState = () => {
	const history = useHistory();
	const {on, off, fire} = useNavigationEventBus();
	const [page, setPage] = useState<PageData>({loaded: false});
	const [navigation, setNavigation] = useState<Navigation | null>(null);

	useEffect(() => {
		const onNavigationPicked = (navigation: Navigation) => {
			setNavigation(navigation);
		};
		on(NavigationEventTypes.NAVIGATION_PICKED, onNavigationPicked);
		return () => {
			off(NavigationEventTypes.NAVIGATION_PICKED, onNavigationPicked);
		};
	}, [on, off]);
	useEffect(() => {
		const onNavigationSearched = (page: TuplePage<QueryTuple>, searchText: string) => {
			setPage({loaded: true, data: page, searchText});
		};
		on(NavigationEventTypes.NAVIGATION_SEARCHED, onNavigationSearched);
		return () => {
			off(NavigationEventTypes.NAVIGATION_SEARCHED, onNavigationSearched);
		};
	}, [on, off]);
	useEffect(() => {
		const onToEditNavigation = (navigation: Navigation) => {
			setNavigation(navigation);
			history.push(toNavigationEdit(navigation.navigationId));
		};
		on(NavigationEventTypes.TO_EDIT_NAVIGATION, onToEditNavigation);
		return () => {
			off(NavigationEventTypes.TO_EDIT_NAVIGATION, onToEditNavigation);
		};
	}, [on, off, fire, history]);
	useEffect(() => {
		const onAskNavigation = (onData: (navigation?: Navigation) => void) => {
			onData(navigation == null ? (void 0) : navigation);
		};
		on(NavigationEventTypes.ASK_NAVIGATION, onAskNavigation);
		return () => {
			off(NavigationEventTypes.ASK_NAVIGATION, onAskNavigation);
		};
	}, [on, off, navigation]);
	useEffect(() => {
		const onAskNavigationPage = (onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void) => {
			if (page.loaded) {
				onData(page.data, page.searchText);
			} else {
				onData();
			}
		};
		on(NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, onAskNavigationPage);
		return () => {
			off(NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, onAskNavigationPage);
		};
	}, [on, off, page.loaded, page.data, page.searchText]);
	useEffect(() => {
		const onBackToQuery = () => {
			setNavigation(null);
			history.push(Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY);
		};
		on(NavigationEventTypes.BACK_TO_QUERY, onBackToQuery);
		return () => {
			off(NavigationEventTypes.BACK_TO_QUERY, onBackToQuery);
		};
	}, [on, off, history]);
	useEffect(() => {
		const onNavigationSaved = (navigation: Navigation) => {
			if (!page.loaded || page.data == null) {
				return;
			}
			// eslint-disable-next-line
			const found = page.data.data.find(nav => (nav as QueryNavigation).navigationId == navigation.navigationId) as (QueryNavigation | undefined);
			if (found != null) {
				found.name = navigation.name;
				found.lastModified = navigation.lastModified;
			}
		};
		on(NavigationEventTypes.NAVIGATION_SAVED, onNavigationSaved);
		return () => {
			off(NavigationEventTypes.NAVIGATION_SAVED, onNavigationSaved);
		};
	}, [on, off, page.loaded, page.data]);

	return <Fragment/>;
};