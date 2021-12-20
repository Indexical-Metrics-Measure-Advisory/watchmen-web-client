import {ICON_LOADING, ICON_WAIT_INPUT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState} from 'react';
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
	initSearchText?: string;
	search: (text: string) => Promise<SearchItems<I>>;
	onSelectionChange: (item: I) => Promise<string | void>;
	openText?: string;
	closeText?: string;
	placeholder?: string;
	buttonFirst?: boolean;
	alwaysShowSearchInput?: boolean;
	hideButton?: boolean;
}) => {
	const {
		initSearchText, search, onSelectionChange,
		openText, placeholder,
		buttonFirst = false, alwaysShowSearchInput = false, hideButton = false
	} = props;
	const {closeText = openText} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const {on, off, fire} = useSearchTextEventBus();
	const [showSearchInput, setShowSearchInput] = useState(alwaysShowSearchInput);
	const [showSearchPopup, setShowSearchPopup] = useState(false);
	const [searchText, setSearchText] = useState(initSearchText ?? '');
	const [timeoutHandle, setTimeoutHandle] = useState<number | null>(null);
	const [result, setResult] = useState<SearchResult<I>>({searched: false, items: []});
	const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);
	useEffect(() => {
		const onHideSearch = () => {
			setShowSearchPopup(false);
			setShowSearchInput(false);
			setSearchText('');
			setResult({searched: false, items: []});
			setActiveItemIndex(-1);
			inputRef.current?.blur();
		};
		const onHidePopup = () => {
			setShowSearchPopup(false);
			setResult({searched: false, items: []});
			setActiveItemIndex(-1);
		};
		const onFocus = () => {
			inputRef.current?.focus();
		};
		on(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
		on(SearchTextEventTypes.HIDE_POPUP, onHidePopup);
		on(SearchTextEventTypes.FOCUS, onFocus);
		return () => {
			off(SearchTextEventTypes.HIDE_SEARCH, onHideSearch);
			off(SearchTextEventTypes.HIDE_POPUP, onHidePopup);
			off(SearchTextEventTypes.FOCUS, onFocus);
		};
	}, [on, off]);
	useCollapseFixedThing({
		containerRef,
		visible: showSearchPopup,
		hide: () => setShowSearchPopup(false)
	});

	const doSearch = (text: string) => {
		if (text.length === 0) {
			setTimeoutHandle(handle => {
				if (handle != null) {
					window.clearTimeout(handle);
				}
				return window.setTimeout(() => {
					setActiveItemIndex(-1);
					setResult({searched: false, items: []});
				}, 300);
			});
		} else {
			setTimeoutHandle(handle => {
				if (handle != null) {
					window.clearTimeout(handle);
				}
				return window.setTimeout(async () => {
					try {
						const items = await search(text);
						setActiveItemIndex(items.length !== 0 ? 0 : -1);
						setResult({searched: true, items});
					} catch {
						setActiveItemIndex(-1);
						setResult({searched: true, items: []});
					}
				}, 150);
			});
		}
	};
	const onSearchTextChanged = async (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setSearchText(value);
		setShowSearchPopup(true);
		doSearch(value.trim());
	};
	const onSearchTextFocused = () => {
		if (searchText.trim().length !== 0) {
			if (!showSearchPopup) {
				if (result.searched) {
					setActiveItemIndex(result.items.length !== 0 ? 0 : -1);
				} else {
					doSearch(searchText.trim());
				}
				setShowSearchPopup(true);
			}
		}
	};
	const onSearchTextKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case 'ArrowUp':
				if (activeItemIndex !== 0 && activeItemIndex !== -1) {
					setActiveItemIndex(activeItemIndex - 1);
					containerRef.current?.querySelector(`div[data-widget=candidate-item-${activeItemIndex - 1}]`)?.scrollIntoView({behavior: 'smooth'});
				}
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'ArrowDown':
				if (activeItemIndex !== -1 && activeItemIndex !== result.items.length - 1) {
					setActiveItemIndex(activeItemIndex + 1);
					containerRef.current?.querySelector(`div[data-widget=candidate-item-${activeItemIndex + 1}]`)?.scrollIntoView({behavior: 'smooth'});
				}
				event.preventDefault();
				event.stopPropagation();
				break;
			case 'Enter':
				if (activeItemIndex !== -1) {
					if (timeoutHandle != null) {
						window.clearTimeout(timeoutHandle);
					}
					const text = await onSelectionChange(result.items[activeItemIndex]);
					if (text != null) {
						setSearchText(text);
					}
				}
				break;
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
	const onCandidateItemMouseEnter = (itemIndex: number) => () => setActiveItemIndex(itemIndex);
	const onCandidateClicked = (item: I) => async () => {
		const text = await onSelectionChange(item);
		if (text != null) {
			setSearchText(text);
		}
	};

	return <SearchPart buttonFirst={buttonFirst} buttonVisible={!hideButton} popupVisible={showSearchPopup}
	                   ref={containerRef}>
		<SearchInput value={searchText} visible={showSearchInput}
		             placeholder={placeholder}
		             onChange={onSearchTextChanged} onFocus={onSearchTextFocused}
		             onKeyDown={onSearchTextKeyDown}
		             buttonFirst={buttonFirst} buttonVisible={!hideButton}
		             ref={inputRef}/>
		{hideButton
			? null
			: <SearchButton ink={ButtonInk.PRIMARY} buttonFirst={buttonFirst}
			                alwaysShowSearchInput={alwaysShowSearchInput}
			                finding={showSearchInput}
			                onClick={onSearchClicked}>
				{showSearchInput ? closeText : openText}
			</SearchButton>}
		<SearchPopup>
			{result.searched
				? (result.items.length === 0
					? <CandidateItem active={false}>{Lang.INDICATOR_WORKBENCH.INDICATOR.NO_MATCHED}</CandidateItem>
					: result.items.map((item, itemIndex) => {
						return <CandidateItem active={itemIndex === activeItemIndex}
						                      data-widget={`candidate-item-${itemIndex}`}
						                      onMouseEnter={onCandidateItemMouseEnter(itemIndex)}
						                      onClick={onCandidateClicked(item)}
						                      key={item.key}>
							{item.text}
						</CandidateItem>;
					}))
				: <OnSearching>
					{searchText.trim().length === 0
						? <>
							<FontAwesomeIcon icon={ICON_WAIT_INPUT}/>
							<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.WAIT_INPUT}</span>
						</>
						: <>
							<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
							<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.SEARCHING}</span>
						</>}
				</OnSearching>}
		</SearchPopup>
	</SearchPart>;
};