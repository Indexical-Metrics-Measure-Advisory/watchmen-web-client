import {ACCOUNT_KEY_IN_SESSION, ACCOUNT_TOKEN} from '../session-constants';
import {SessionAccount} from './types';

export const saveAccountIntoSession = ({name, admin}: SessionAccount) => {
    sessionStorage.setItem(ACCOUNT_KEY_IN_SESSION, btoa(JSON.stringify({name, admin})));
};

export const findAccount = (): SessionAccount | undefined => {
    const value = sessionStorage.getItem(ACCOUNT_KEY_IN_SESSION);
    if (value) {
        try {
            return JSON.parse(atob(value));
        } catch {
            return (void 0);
        }
    }

    return (void 0);
};

export const isAdmin = (): boolean => {
    const account = findAccount();
    return !!account && account.admin;
};

export const findToken = (): string | null => {
    return sessionStorage.getItem(ACCOUNT_TOKEN);
};

export const saveTokenIntoSession = (token: string) => {
    sessionStorage.setItem(ACCOUNT_TOKEN, token);
};

export const quit = () => {
    sessionStorage.clear();
};
