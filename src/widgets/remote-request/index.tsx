import {Router} from '@/routes/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AlertLabel} from '../alert/widgets';
import {ICON_LOADING} from '../basic/constants';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {RemoteRequestContainer} from './widgets';

export const RemoteRequest = () => {
	const history = useHistory();
	const {once, on, off, fire} = useEventBus();
	const [count, setCount] = useState<number>(0);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const on401 = () => {
			once(EventTypes.ALERT_HIDDEN, () => {
				history.replace(Router.LOGIN);
			}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNAUTHORIZED}</AlertLabel>);
		};
		const on403 = () => {
			once(EventTypes.ALERT_HIDDEN, () => {
				history.replace(Router.LOGIN);
			}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.ACCESS_DENIED}</AlertLabel>);
		};
		const onOtherError = () => {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNPREDICTED}</AlertLabel>);
		};
		const onInvokeRemoteRequest = async (request: () => Promise<any>, success: (data?: any) => void, failure?: (error?: any) => void) => {
			// console.trace();
			setCount(count => count + 1);
			forceUpdate();
			try {
				const data = await request();
				success(data);
			} catch (e: any) {
				console.error(e);
				if (e.status === 401) {
					on401();
					return;
				} else if (e.status === 403) {
					on403();
				} else {
					onOtherError();
				}
				if (failure) {
					failure(e);
				}
			} finally {
				setCount(count => count - 1);
			}
		};
		on(EventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
		return () => {
			off(EventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
		};
	}, [once, on, off, fire, history, forceUpdate, count]);

	return <RemoteRequestContainer visible={count > 0}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</RemoteRequestContainer>;
};