import {Indicator} from '@/services/data/indicators/types';
import {ICON_SEARCH} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorSearchBarContainer, IndicatorSearchButton, IndicatorSearchInput} from './widgets';

export const IndicatorSearchBar = () => {
	const {on, off, fire} = useIndicatorsEventBus();
	const searchRef = useRef<HTMLInputElement>(null);
	const [onSearch, setOnSearch] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	useEffect(() => {
		const onIndicatorEdit = (indicators: Array<Indicator>) => {
			setOnSearch(false);
		};
		on(IndicatorsEventTypes.INDICATOR_DETECTED, onIndicatorEdit);
		return () => {
			off(IndicatorsEventTypes.INDICATOR_DETECTED, onIndicatorEdit);
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

		fire(IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText.trim(), 1);
	};

	return <IndicatorSearchBarContainer>
		<IndicatorSearchButton onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
		</IndicatorSearchButton>
		<IndicatorSearchInput placeholder="Search by topic name, indicator name, indicator type etc."
		                      value={searchText} onChange={onSearchChanged}
		                      onKeyPress={onSearchKeyPressed}
		                      ref={searchRef}/>
	</IndicatorSearchBarContainer>;
};