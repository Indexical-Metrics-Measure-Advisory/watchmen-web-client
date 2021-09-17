import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledPipelinesGraphics} from '../types';

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