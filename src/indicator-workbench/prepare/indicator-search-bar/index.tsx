import {ICON_SEARCH} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes, IndicatorsState} from '../indicators-event-bus-types';
import {IndicatorSearchBarContainer, IndicatorSearchButton, IndicatorSearchInput} from './widgets';

export const IndicatorSearchBar = () => {
	const {fire: fireGlobal} = useEventBus();
	const {once, on, off, fire} = useIndicatorsEventBus();
	const searchRef = useRef<HTMLInputElement>(null);
	const [onSearch, setOnSearch] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	useEffect(() => {
		const onIndicatorEdit = () => setOnSearch(false);
		on(IndicatorsEventTypes.INDICATOR_CREATED, onIndicatorEdit);
		on(IndicatorsEventTypes.INDICATOR_LOADED, onIndicatorEdit);
		return () => {
			off(IndicatorsEventTypes.INDICATOR_CREATED, onIndicatorEdit);
			off(IndicatorsEventTypes.INDICATOR_LOADED, onIndicatorEdit);
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

		once(IndicatorsEventTypes.REPLY_INDICATOR_STATE, (state: IndicatorsState) => {
			if (state !== IndicatorsState.SAVED && state !== IndicatorsState.NONE) {
				fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
					'Still in editing, all changes will be lost if interrupt. Are you sure to continue?',
					() => {
						fire(IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText.trim(), 1);
						fireGlobal(EventTypes.HIDE_DIALOG);
					},
					() => fireGlobal(EventTypes.HIDE_DIALOG));
			} else {
				fire(IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText.trim(), 1);
			}
		}).fire(IndicatorsEventTypes.ASK_INDICATOR_STATE);
	};

	return <IndicatorSearchBarContainer>
		<IndicatorSearchButton onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
		</IndicatorSearchButton>
		<IndicatorSearchInput placeholder="Search by topic name, indicator name, etc."
		                      value={searchText} onChange={onSearchChanged}
		                      onKeyPress={onSearchKeyPressed}
		                      ref={searchRef}/>
	</IndicatorSearchBarContainer>;
};