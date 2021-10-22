import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {ColorPickerEventBus} from './color-picker-event-bus-types';

const Context = React.createContext<ColorPickerEventBus>({} as ColorPickerEventBus);
Context.displayName = 'ColorPickerEventBus';

export const ColorPickerEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ColorPickerEventBus>('color picker');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useColorPickerEventBus = () => useContext(Context);
