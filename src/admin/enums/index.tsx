import {DataPage} from '@/services/data/query/data-page';
import {fetchEnum, listEnums, listEnumsForHolder, saveEnum} from '@/services/data/tuples/enum';
import {Enum} from '@/services/data/tuples/enum-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect} from 'react';
import EnumBackground from '../../assets/enum-background.svg';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createEnum} from './utils';

const fetchEnumAndCodes = async (queryEnum: QueryEnum) => {
	const {enumeration, parents} = await fetchEnum(queryEnum.enumId);
	return {tuple: enumeration, parents};
};

const getKeyOfEnum = (enumeration: QueryEnum) => enumeration.enumId;

const AdminEnums = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
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
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveEnum = async (enumeration: Enum) => {
			if (!enumeration.name || !enumeration.name.trim()) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, enumeration, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Enumeration name is required.</AlertLabel>);
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveEnum(enumeration),
				() => fire(TupleEventTypes.TUPLE_SAVED, enumeration, true),
				() => fire(TupleEventTypes.TUPLE_SAVED, enumeration, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateEnum);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditEnum);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchEnum);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveEnum);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateEnum);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditEnum);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchEnum);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveEnum);
		};
	}, [on, off, fire, onceGlobal, fireGlobal]);

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