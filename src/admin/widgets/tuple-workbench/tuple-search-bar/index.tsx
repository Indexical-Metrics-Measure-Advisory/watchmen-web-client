import {ICON_SEARCH} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleSearchBarContainer, TupleSearchButton, TupleSearchInput} from './widgets';

export const TupleSearchBar = (props: {
	placeholder?: string;
	canCreate: boolean;
}) => {
	const {placeholder, canCreate} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	const searchRef = useRef<HTMLInputElement>(null);
	const [onSearch, setOnSearch] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	useEffect(() => {
		const onTupleEdit = () => setOnSearch(false);
		on(TupleEventTypes.TUPLE_CREATED, onTupleEdit);
		on(TupleEventTypes.TUPLE_LOADED, onTupleEdit);
		return () => {
			off(TupleEventTypes.TUPLE_CREATED, onTupleEdit);
			off(TupleEventTypes.TUPLE_LOADED, onTupleEdit);
		};
	}, [on, off]);
	useEffect(() => {
		searchRef.current!.focus();
	}, [searchRef]);

	const onSearchClicked = () => {
		!onSearch && setOnSearch(true);
		searchRef.current!.focus();
		searchRef.current!.select();
	};
	const onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};
	const onSearchKeyPressed = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}

		fire(TupleEventTypes.ASK_TUPLE_STATE, (state: TupleState) => {
			if (state !== TupleState.SAVED && state !== TupleState.NONE) {
				fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
					'Still in editing, all changes will be lost if interrupt. Are you sure to continue?',
					() => {
						fire(TupleEventTypes.DO_SEARCH_TUPLE, searchText.trim(), 1);
						fireGlobal(EventTypes.HIDE_DIALOG);
					},
					() => fireGlobal(EventTypes.HIDE_DIALOG));
			} else {
				fire(TupleEventTypes.DO_SEARCH_TUPLE, searchText.trim(), 1);
			}
		});
	};

	return <TupleSearchBarContainer noIndent={!canCreate}>
		<TupleSearchButton onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
		</TupleSearchButton>
		<TupleSearchInput placeholder={placeholder}
		                  value={searchText} onChange={onSearchChanged}
		                  onKeyPress={onSearchKeyPressed}
		                  ref={searchRef}/>
	</TupleSearchBarContainer>;
};