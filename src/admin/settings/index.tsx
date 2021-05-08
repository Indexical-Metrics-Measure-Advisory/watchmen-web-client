import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {ThemeSettings} from './theme';

export const AdminSettings = () => {
    return <FixWidthPage>
        <PageHeader title="Settings"/>
        <VerticalMarginOneUnit/>
        <ThemeSettings/>
    </FixWidthPage>;
};

const AdminSettingsIndex = () => {
    return <AdminSettings/>;
};

export default AdminSettingsIndex;