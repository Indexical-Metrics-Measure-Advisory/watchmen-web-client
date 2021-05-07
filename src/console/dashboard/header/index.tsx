import React from 'react';
import {Dashboard} from '../../../services/tuples/dashboard-types';
import {HeaderButtons} from './header-buttons';
import {HeaderNameEditor} from './header-name-editor';
import {DashboardPageHeaderHolder} from './widgets';

export const DashboardHeader = (props: { dashboard: Dashboard }) => {
    const {dashboard} = props;

    return <DashboardPageHeaderHolder>
        <HeaderNameEditor dashboard={dashboard}/>
        <HeaderButtons dashboard={dashboard}/>
    </DashboardPageHeaderHolder>;

};