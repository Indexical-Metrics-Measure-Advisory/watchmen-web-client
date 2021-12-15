import {Indicator} from '@/services/data/tuples/indicator-types';
import {Lang} from '@/widgets/langs';
import {useRef} from 'react';
import {IndicatorRootNode} from './widgets';

export const IndicatorRoot = (props: { indicator?: Indicator }) => {
	const {indicator} = props;

	const ref = useRef<HTMLDivElement>(null);

	return <IndicatorRootNode ref={ref}>
		{indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}
	</IndicatorRootNode>;
};