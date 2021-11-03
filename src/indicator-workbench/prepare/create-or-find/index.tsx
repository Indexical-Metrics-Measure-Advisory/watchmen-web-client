import {useIndicatorsEventBus} from '@/indicator-workbench/prepare/indicators-event-bus';
import {IndicatorsEventTypes} from '@/indicator-workbench/prepare/indicators-event-bus-types';
import {Input} from '@/widgets/basic/input';
import {ButtonInk} from '@/widgets/basic/types';
import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {SinkingLabel, Step, StepTitle, StepTitleButton} from '../step-widgets';

const Title = styled(StepTitle)`
	> button:first-child {
		margin-right : calc(var(--margin) / 2);
	}
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
	margin-right   : calc(var(--margin) / 2);
`;
const SearchButton = styled(StepTitleButton).attrs<{ finding: boolean }>(({finding}) => {
	return {
		style: {
			borderTopLeftRadius: finding ? 0 : (void 0),
			borderBottomLeftRadius: finding ? 0 : (void 0)
		}
	};
})<{ finding: boolean }>`
`;
const SearchInput = styled(Input).attrs<{ visible: boolean }>(({visible}) => {
	return {
		style: {
			width: visible ? (void 0) : 0,
			padding: visible ? (void 0) : 0,
			marginRight: visible ? (void 0) : 0,
			borderColor: visible ? (void 0) : 'transparent',
			pointerEvents: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	width                     : 100%;
	height                    : calc(var(--height) * 1.2);
	line-height               : calc(var(--height) * 1.1);
	margin-right              : calc(var(--height) * -0.6);
	padding-left              : calc(var(--height) * 0.6);
	border-width              : 2px;
	border-color              : var(--primary-color);
	border-top-left-radius    : calc(var(--height) * 0.6);
	border-bottom-left-radius : calc(var(--height) * 0.6);
	font-size                 : 1.2em;
`;

export const CreateOrFind = () => {
	const {fire} = useIndicatorsEventBus();
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchText, setSearchText] = useState('');

	const onCreateClicked = () => {
		setShowSearchInput(false);
		fire(IndicatorsEventTypes.DO_CREATE_INDICATOR);
	};
	const onSearchClicked = () => {
		setShowSearchInput(!showSearchInput);
	};
	const onSearchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setSearchText(value);
	};

	return <Step index={1}>
		<Title>
			<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
				Create An Indicator
			</StepTitleButton>
			<Label>Or</Label>
			<SearchInput value={searchText} onChange={onSearchTextChanged}
			             visible={showSearchInput}/>
			<SearchButton ink={ButtonInk.PRIMARY} finding={showSearchInput} onClick={onSearchClicked}>
				{showSearchInput ? 'Discard Finding' : 'Find Existed Indicator'}
			</SearchButton>
		</Title>
	</Step>;
};