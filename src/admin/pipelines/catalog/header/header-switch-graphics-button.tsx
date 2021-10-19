import {PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Button} from '@/widgets/basic/button';
import {ICON_SWITCH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import styled from 'styled-components';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledPipelinesGraphics} from '../types';

const SwitchDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const ConnectedSpaceDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const GraphicsSwitch = (props: { graphics: Array<PipelinesGraphics>, switchTo: (graphics: PipelinesGraphics) => void }) => {
	const {graphics, switchTo} = props;

	const {fire} = useEventBus();
	const [selection, setSelection] = useState(graphics[0]);

	const onChange = (option: DropdownOption) => {
		setSelection(option.value as PipelinesGraphics);
	};
	const onConfirmClicked = () => {
		switchTo(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = graphics.map(graphics => {
		return {
			value: graphics,
			label: graphics.name || 'Noname Pipelines',
			key: graphics.pipelineGraphId
		};
	});

	return <>
		<SwitchDialogBody>
			<DialogLabel>Please select pipelines group</DialogLabel>
			<ConnectedSpaceDropdown value={selection} options={options} onChange={onChange}/>
		</SwitchDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>Confirm</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderSwitchGraphicsButton = (props: { allGraphics: Array<PipelinesGraphics>, graphics: AssembledPipelinesGraphics }) => {
	const {allGraphics, graphics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useCatalogEventBus();

	const onSwitchTo = (graphics: PipelinesGraphics) => {
		fire(CatalogEventTypes.SWITCH_GRAPHICS, graphics);
	};
	const onSwitchClicked = () => {
		// eslint-disable-next-line
		const candidates = allGraphics.sort((g1, g2) => {
			return (g1.name || '').toLowerCase().localeCompare((g2.name || '').toLowerCase());
		}).filter(exists => exists.pipelineGraphId !== graphics.pipelineGraphId);
		fireGlobal(EventTypes.SHOW_DIALOG,
			<GraphicsSwitch graphics={candidates} switchTo={onSwitchTo}/>);
	};

	return <PageHeaderButton tooltip="Switch Graphics"
	                         onClick={onSwitchClicked}>
		<FontAwesomeIcon icon={ICON_SWITCH}/>
	</PageHeaderButton>;
};