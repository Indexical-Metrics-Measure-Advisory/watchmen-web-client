import {ICON_LOADING} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {useSearchTextEventBus} from './search-text-event-bus';
import {SearchTextEventTypes} from './search-text-event-bus-types';
import {CandidateItem, OnSearching, SearchButton, SearchInput, SearchPart, SearchPopup} from './widgets';

export interface SearchItem {
	key: string;
	text: ReactNode;
}

export type SearchItems = Array<SearchItem>;

interface SearchResult {
	searched: boolean;
	items: SearchItems;
}

export const SearchText = () => {
	const {on, off} = useSearchTextEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [result] = useState<SearchResult>({searched: false, items: []});
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
			{result.searched
				? result.items.map(item => {
					return <CandidateItem key={item.key}>
						{item.text}
					</CandidateItem>;
				})
				: <OnSearching>
					<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
					<span>Searching...</span>
				</OnSearching>}
		</SearchPopup>
	</SearchPart>;
};