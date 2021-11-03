import {ICON_LOADING} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent, ReactNode, useEffect, useRef, useState} from 'react';
import {useSearchTextEventBus} from './search-text-event-bus';
import {SearchTextEventTypes} from './search-text-event-bus-types';
import {CandidateItem, OnSearching, SearchButton, SearchInput, SearchPart, SearchPopup} from './widgets';

export interface SearchItem {
	key: string;
	text: ReactNode;
}

export type SearchItems<I extends SearchItem> = Array<I>;

interface SearchResult<I extends SearchItem> {
	searched: boolean;
	items: SearchItems<I>;
}

export const SearchText = <I extends SearchItem>(props: {
	search: (text: string) => Promise<SearchItems<I>>;
	onSelectionChange: (item: I) => Promise<void>;
}) => {
	const {search, onSelectionChange} = props;

	const {on, off, fire} = useSearchTextEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [result, setResult] = useState<SearchResult<I>>({searched: false, items: []});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onHideSearch = () => {
			setShowSearchInput(false);
			setSearchText('');
			setResult({searched: false, items: []});
			inputRef.current?.blur();
		};
		on(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		return () => {
			off(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		};
	}, [on, off]);

	const onSearchTextChanged = async (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setSearchText(value);
		const text = value.trim();
		if (text.length === 0) {
			setTimeout(() => setResult({searched: false, items: []}), 300);
			forceUpdate();
		} else {
			try {
				const items = await search(text);
				setResult({searched: true, items});
			} catch {
				setResult({searched: true, items: []});
			}
		}
	};
	const onSearchClicked = () => {
		if (!showSearchInput) {
			setShowSearchInput(true);
			inputRef.current?.focus();
		} else {
			fire(SearchTextEventTypes.HIDE_SEARCH);
		}
	};
	const onCandidateClicked = (item: I) => async () => {
		await onSelectionChange(item);
		fire(SearchTextEventTypes.HIDE_SEARCH);
	};

	const searchPopupVisible = showSearchInput && searchText.trim() !== '';

	return <SearchPart popupVisible={searchPopupVisible}>
		<SearchInput value={searchText} onChange={onSearchTextChanged}
		             visible={showSearchInput} placeholder="By indicator name, topic name or factor name."
		             ref={inputRef}/>
		<SearchButton ink={ButtonInk.PRIMARY} finding={showSearchInput} onClick={onSearchClicked}>
			{showSearchInput ? 'Discard Finding' : 'Find Existed Indicator'}
		</SearchButton>
		<SearchPopup>
			{result.searched
				? (result.items.length === 0
					? <CandidateItem>No matching indicator found.</CandidateItem>
					: result.items.map(item => {
						return <CandidateItem onClick={onCandidateClicked(item)} key={item.key}>
							{item.text}
						</CandidateItem>;
					}))
				: <OnSearching>
					<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
					<span>Searching...</span>
				</OnSearching>}
		</SearchPopup>
	</SearchPart>;
};