import React from 'react';
import {PageTitleEditor} from '../../../../basic-widgets/page-title-editor';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {AssembledPipelinesGraphics} from '../types';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';

export const NameEditor = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;

	const {fire} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		graphics.name = name;
		forceUpdate();
	};
	const onNameChangeComplete = async (name: string) => {
		graphics.name = name.trim() || 'Noname Pipelines Group';
		forceUpdate();
		fire(CatalogEventTypes.NAME_CHANGED, graphics);
	};

	return <PageTitleEditor title={graphics.name}
	                        defaultTitle="Noname Pipelines Group"
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};