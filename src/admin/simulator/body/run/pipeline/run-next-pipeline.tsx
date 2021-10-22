import {Fragment, useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';

export const RunNextPipeline = (props: { runNext: () => void }) => {
	const {runNext} = props;

	const {on, off} = useRuntimeEventBus();
	useEffect(() => {
		const onRunNextPipeline = () => runNext();
		on(RuntimeEventTypes.RUN_NEXT_PIPELINE, onRunNextPipeline);
		return () => {
			off(RuntimeEventTypes.RUN_NEXT_PIPELINE, onRunNextPipeline);
		};
	}, [on, off, runNext]);

	return <Fragment/>;
};