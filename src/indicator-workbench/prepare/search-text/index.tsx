import {ICON_LOADING, ICON_WAIT_INPUT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
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
	openText: string;
	closeText?: string;
	placeholder?: string;
	buttonFirst?: boolean;
	alwaysShowSearchInput?: boolean;
}) => {
	const {
		search, onSelectionChange,
		openText, placeholder,
		buttonFirst = false, alwaysShowSearchInput = false
	} = props;
	const {closeText = openText} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const {on, off, fire} = useSearchTextEventBus();
	const [showSearchInput, setShowSearchInput] = useState(alwaysShowSearchInput);
	const [showSearchPopup, setShowSearchPopup] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [result, setResult] = useState<SearchResult<I>>({searched: false, items: []});
	useEffect(() => {
		const onHideSearch = () => {
			setShowSearchPopup(false);
			setShowSearchInput(false);
			setSearchText('');
			setResult({searched: false, items: []});
			inputRef.current?.blur();
		};
		const onFocus = () => {
			inputRef.current?.focus();
		};
		on(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		on(SearchTextEventTypes.FOCUS, onFocus);
		return () => {
			off(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
			off(SearchTextEventTypes.FOCUS, onFocus);
		};
	}, [on, off]);
	useCollapseFixedThing({
		containerRef,
		visible: showSearchPopup,
		hide: () => setShowSearchPopup(false)
	});

	const onSearchTextChanged = async (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setSearchText(value);
		setShowSearchPopup(true);
		const text = value.trim();
		if (text.length === 0) {
			setTimeout(() => setResult({searched: false, items: []}), 300);
		} else {
			try {
				const items = await search(text);
				setResult({searched: true, items});
			} catch {
				setResult({searched: true, items: []});
			}
		}
	};
	const onSearchTextFocused = () => {
		if (searchText.trim().length !== 0) {
			setShowSearchPopup(true);
		}
	};
	const onSearchClicked = () => {
		if (alwaysShowSearchInput) {
			return;
		}
		if (!showSearchInput) {
			setShowSearchInput(true);
			inputRef.current?.focus();
		} else {
			fire(SearchTextEventTypes.HIDE_SEARCH);
		}
	};
	const onCandidateClicked = (item: I) => async () => {
		await onSelectionChange(item);
	};

	return <SearchPart buttonFirst={buttonFirst} popupVisible={showSearchPopup} ref={containerRef}>
		<SearchInput value={searchText} visible={showSearchInput}
		             placeholder={placeholder}
		             onChange={onSearchTextChanged} onFocus={onSearchTextFocused}
		             buttonFirst={buttonFirst}
		             ref={inputRef}/>
		<SearchButton ink={ButtonInk.PRIMARY} buttonFirst={buttonFirst} alwaysShowSearchInput={alwaysShowSearchInput}
		              finding={showSearchInput}
		              onClick={onSearchClicked}>
			{showSearchInput ? closeText : openText}
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
					{searchText.trim().length === 0
						? <>
							<FontAwesomeIcon icon={ICON_WAIT_INPUT}/>
							<span>Waiting for input...</span>
						</>
						: <>
							<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
							<span>Searching...</span>
						</>}
				</OnSearching>}
		</SearchPopup>
	</SearchPart>;
};