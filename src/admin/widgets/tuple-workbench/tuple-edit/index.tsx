import {Tuple} from '@/services/data/tuples/tuple-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {HoldByTuple, TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleBackgroundImage} from './background-image';
import {InformMessage} from './inform-message';
import {TupleEditBody, TupleEditContainer, TupleEditFooter, TupleEditFooterButton, TupleEditTitle} from './widgets';

interface State<T, HBT> {
	tuple?: T;
	codes?: HBT;
}

export const TupleEdit = <T extends Tuple, HBT extends HoldByTuple>(props: {
	tupleLabel: string;
	tupleImage: string;
	tupleImagePosition?: string;
	canEdit: boolean;
	renderEditor: (tuple: T, codes?: HBT) => ReactNode;
}) => {
	const {tupleLabel, tupleImage, tupleImagePosition, canEdit, renderEditor} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	const [state, setState] = useState<State<T, HBT>>({});
	useEffect(() => {
		const onTupleCreated = (tuple: T, codes?: HBT) => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.NONE);
			setState({tuple, codes});
		};
		const onTupleLoaded = (tuple: T, codes?: HBT) => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.NONE);
			setState({tuple, codes});
		};
		const onHide = () => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.NONE);
			setState({});
		};
		on(TupleEventTypes.TUPLE_CREATED, onTupleCreated);
		on(TupleEventTypes.TUPLE_LOADED, onTupleLoaded);
		on(TupleEventTypes.TUPLE_SEARCHED, onHide);
		return () => {
			off(TupleEventTypes.TUPLE_CREATED, onTupleCreated);
			off(TupleEventTypes.TUPLE_LOADED, onTupleLoaded);
			off(TupleEventTypes.TUPLE_SEARCHED, onHide);
		};
	}, [on, off, fire]);

	const onConfirmClicked = async () => {
		fire(TupleEventTypes.ASK_TUPLE_STATE, (tupleState: TupleState) => {
			if (tupleState !== TupleState.CHANGED) {
				return;
			}

			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.SAVING);
			fire(TupleEventTypes.SAVE_TUPLE, state.tuple!, (tuple: T, saved: boolean) => {
				if (saved) {
					fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.SAVED);
				} else {
					fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
				}
			});
		});
	};
	const onCloseClicked = () => {
		fire(TupleEventTypes.ASK_TUPLE_STATE, (tupleState: TupleState) => {
			if (tupleState === TupleState.NONE || tupleState === TupleState.SAVED) {
				setState({});
				fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.NONE);
				fire(TupleEventTypes.TUPLE_EDIT_DONE);
			} else if (tupleState === TupleState.SAVING) {
				fireGlobal(EventTypes.SHOW_ALERT,
					<AlertLabel>
						Saving now, please close it when data saved.
					</AlertLabel>);
			} else {
				// changed
				fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
					'Data already changed, all changes will be lost if close. Are you sure to continue?',
					() => {
						setState({});
						fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.NONE);
						fire(TupleEventTypes.TUPLE_EDIT_DONE);
						fireGlobal(EventTypes.HIDE_DIALOG);
					},
					() => fireGlobal(EventTypes.HIDE_DIALOG));
			}
		});
	};

	const onEditing = !!state.tuple && !isFakedUuid(state.tuple);
	const title = onEditing ? `An Exists ${tupleLabel}` : `A New ${tupleLabel}`;

	return <TupleEditContainer visible={!!state.tuple}>
		<TupleBackgroundImage tupleImage={tupleImage} tupleImagePosition={tupleImagePosition}/>
		<TupleEditBody>
			<TupleEditTitle>{title}</TupleEditTitle>
			{state.tuple ? renderEditor(state.tuple, state.codes) : null}
		</TupleEditBody>
		<TupleEditFooter>
			<InformMessage/>
			{canEdit
				? <TupleEditFooterButton ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>
					<span>Confirm</span>
				</TupleEditFooterButton>
				: null}
			<TupleEditFooterButton ink={ButtonInk.DANGER} onClick={onCloseClicked}>
				<span>Close</span>
			</TupleEditFooterButton>
		</TupleEditFooter>
	</TupleEditContainer>;
};
