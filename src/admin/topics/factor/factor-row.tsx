import React from 'react';
import { Factor } from '../../../services/tuples/factor-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorDefaultValueCell } from './factor-default-value-cell';
import { FactorLabelCell } from './factor-label-cell';
import { FactorNameCell } from './factor-name-cell';
import { FactorTypeCell } from './factor-type-cell';

export const FactorRow = (props: {
	topic: Topic;
	factor: Factor;
}) => {
	const { topic, factor } = props;

	// const onFactorDeleteClicked = () => {
	// 	topic.factors = topic.factors.filter(exists => exists !== factor);
	// 	fire(TopicEventTypes.FACTOR_REMOVED, factor);
	// };
	// const onInsertBeforeClicked = () => {
	// 	const index = topic.factors.indexOf(factor);
	// 	const newFactor = { factorId: generateUuid(), name: '', label: '', type: FactorType.TEXT };
	// 	topic.factors.splice(index, 0, newFactor);
	// 	fire(TopicEventTypes.FACTOR_ADDED, newFactor);
	// };

	return <>
		<FactorNameCell topic={topic} factor={factor}/>
		<FactorLabelCell factor={factor}/>
		<FactorTypeCell topic={topic} factor={factor}/>
		<FactorDefaultValueCell factor={factor}/>
			{/*<FactorPropInput value={factor.description || ''} onChange={onFactorPropChange('description')}/>*/}
			{/*<FactorButtons data-max={max}>*/}
			{/*	<LinkButton ignoreHorizontalPadding={true} tooltip='Delete Factor' center={true}*/}
			{/*	            onClick={onFactorDeleteClicked}>*/}
			{/*		<FontAwesomeIcon icon={faTimes}/>*/}
			{/*	</LinkButton>*/}
			{/*	<LinkButton ignoreHorizontalPadding={true} tooltip='Prepend Factor' center={true}*/}
			{/*	            onClick={onInsertBeforeClicked}>*/}
			{/*		<FontAwesomeIcon icon={faLevelDownAlt} rotation={270}/>*/}
			{/*	</LinkButton>*/}
			{/*</FactorButtons>*/}
	</>;
};