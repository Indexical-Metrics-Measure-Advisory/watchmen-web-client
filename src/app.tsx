import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import RelativeTime from 'dayjs/plugin/relativeTime';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import React from 'react';
import {Alert} from './alert';
import {NotImplement} from './alert/not-implement';
import {WaitRemoteData} from './alert/wait-remote-data';
import {Tooltip} from './basic-widgets/tooltip';
import {Dialog} from './dialog';
import {YesNoDialog} from './dialog/yes-no-dialog';
import {EventBusProvider} from './events/event-bus';
import {Languages} from './langs';
import {Routes} from './routes';
import {ThemeWrapper} from './theme/theme-wrapper';

// datetime functions
dayjs.extend(WeekOfYear);
dayjs.extend(QuarterOfYear);
dayjs.extend(Duration);
dayjs.extend(RelativeTime);

const app = () => {
    return <EventBusProvider>
        <ThemeWrapper/>
        <Languages/>
        <Routes/>
        <Alert/>
        <NotImplement/>
        <WaitRemoteData/>
        <Dialog/>
        <YesNoDialog/>
        <Tooltip/>
    </EventBusProvider>;
};
export default app;
