import {ButtonInk} from '@/widgets/basic/types';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useSearchTextEventBus} from './search-text-event-bus';
import {SearchTextEventTypes} from './search-text-event-bus-types';
import {SearchButton, SearchInput, SearchPart, SearchPopup} from './widgets';

export const SearchText = () => {
	const {on, off} = useSearchTextEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchText, setSearchText] = useState('');
	useEffect(() => {
		const onHideSearch = () => {
			setSearchText('');
			setShowSearchInput(false);
		};
		on(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		return () => {
			off(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		};
	}, [on, off]);

	const onSearchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setSearchText(value);
	};
	const onSearchClicked = () => {
		if (!showSearchInput) {
			setShowSearchInput(true);
			inputRef.current?.focus();
		} else {
			setShowSearchInput(false);
			inputRef.current?.blur();
		}
	};

	const searchPopupVisible = showSearchInput && searchText.trim() !== '';

	return <SearchPart popupVisible={searchPopupVisible}>
		<SearchInput value={searchText} onChange={onSearchTextChanged}
		             visible={showSearchInput} ref={inputRef}/>
		<SearchButton ink={ButtonInk.PRIMARY} finding={showSearchInput} onClick={onSearchClicked}>
			{showSearchInput ? 'Discard Finding' : 'Find Existed Indicator'}
		</SearchButton>
		<SearchPopup>

		</SearchPopup>
	</SearchPart>;
};