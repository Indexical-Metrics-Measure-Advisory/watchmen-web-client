import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchEnumAndParents, listEnums, listEnumsForHolder, saveEnum} from '@/services/data/tuples/enum';
import {Enum} from '@/services/data/tuples/enum-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import EnumBackground from '../../assets/enum-background.svg';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createEnum} from './utils';

const fetchEnumAndCodes = async (queryEnum: QueryEnum) => {
	const {enumeration, parents} = await fetchEnumAndParents(queryEnum.enumId);
	return {tuple: enumeration, parents};
};

const getKeyOfEnum = (enumeration: QueryEnum) => enumeration.enumId;

const AdminEnums = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateEnum = () => {
			const enumeration = createEnum();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listEnumsForHolder(),
				(parents) => fire(TupleEventTypes.TUPLE_CREATED, enumeration, {parents}));
		};
		const onDoEditEnum = async (queryEnum: QueryEnum) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchEnumAndCodes(queryEnum),
				({tuple, parents}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {parents}));
		};
		const onDoSearchEnum = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listEnums({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveEnum = async (enumeration: Enum, onSaved: (enumeration: Enum, saved: boolean) => void) => {
			if (!enumeration.name || !enumeration.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Enumeration name is required.</AlertLabel>, () => {
					onSaved(enumeration, false);
				});
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveEnum(enumeration),
				() => onSaved(enumeration, true),
				() => onSaved(enumeration, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateEnum);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditEnum);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchEnum);
		on(TupleEventTypes.SAVE_TUPLE, onSaveEnum);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateEnum);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditEnum);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchEnum);
			off(TupleEventTypes.SAVE_TUPLE, onSaveEnum);
		};
	}, [on, off, fire, fireGlobal]);

	return <TupleWorkbench title="Enumerations"
	                       createButtonLabel="Create Enumeration" canCreate={true}
	                       searchPlaceholder="Search by enum name, description, etc."
	                       tupleLabel="Enumeration" tupleImage={EnumBackground} tupleImagePosition="left 80px"
	                       renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfEnum}
	/>;
};
const AdminEnumsIndex = () => {
	return <TupleEventBusProvider>
		<AdminEnums/>
	</TupleEventBusProvider>;
};

export default AdminEnumsIndex;