import {fetchLanguageFromSession} from '@/services/data/account/last-snapshot';
import React, {isValidElement, ReactNode, useEffect, useState} from 'react';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {En} from './en';
import {Jp} from './jp';
import {LanguageObjectType} from './types';
import {Zh} from './zh';

type EnType = typeof En;
const LANGUAGES = {
	[En.$$settings.code]: En,
	[Zh.$$settings.code]: Zh as EnType,
	[Jp.$$settings.code]: Jp as unknown as EnType
};

const findLanguage = (lang: string) => {
	const [language, country, variant] = lang.split(/[-_.]/).map(x => (x || '').toLowerCase());
	return LANGUAGES[`${language}_${country}_${variant}`] || LANGUAGES[`${language}_${country}`] || LANGUAGES[language] || En;
};

let currentLanguage = findLanguage(fetchLanguageFromSession() || En.$$settings.code);

export const Languages = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {on, off, fire} = useEventBus();
	useEffect(() => {
		const onLangChange = (lang: string) => {
			currentLanguage = findLanguage(lang);
			fire(EventTypes.LANGUAGE_CHANGED, currentLanguage);
		};
		on(EventTypes.CHANGE_LANGUAGE, onLangChange);
		return () => {
			off(EventTypes.CHANGE_LANGUAGE, onLangChange);
		};
	}, [on, off, fire]);

	return <>{children}</>;
};

export const getLangLabel = (key: string, lang: LanguageObjectType = currentLanguage) => {
	const keys = key.split('.');
	let value = keys.reduce((from: any, key) => from ? from[key] : undefined, lang);
	// call fallback when label not found
	while (value === (void 0)) {
		const fallback = (lang as typeof En).$$settings.fallback;
		if (!fallback) {
			break;
		}
		value = keys.reduce((from: any, key) => from ? from[key] : undefined, LANGUAGES[fallback]);
	}
	return value;
};

const LangLabel = (props: { labelKey: string }) => {
	const {labelKey} = props;

	const {on, off} = useEventBus();
	const [lang, setLang] = useState<LanguageObjectType>(currentLanguage);
	useEffect(() => {
		const onLangChanged = (lang: LanguageObjectType) => setLang(lang);
		on(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		return () => {
			off(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		};
	}, [on, off]);

	const value = getLangLabel(labelKey, lang);

	return <>{value}</>;
};

const PLAIN_KEY = 'PLAIN';
const TARGET = {};
const proxyValue = (value: any, name: string): any => {
	if (name === PLAIN_KEY) {
		return value;
	}
	if (typeof value === 'object' && !isValidElement(value)) {
		return new Proxy<any>(value, {
			get: function (obj, prop: string) {
				return proxyValue(obj[prop], `${name}.${prop}`);
			}
		});
	} else {
		return <LangLabel labelKey={name}/>;
	}
};
const KeyProxy = new Proxy<any>(TARGET, {
	get: function (obj, prop: string) {
		if (prop === '$$typeof') {
			return obj[prop];
		}
		return proxyValue((currentLanguage as any)[prop], prop);
	}
});
export const useLanguage = () => {
	const {on, off} = useEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(EventTypes.LANGUAGE_CHANGED, forceUpdate);
		return () => {
			off(EventTypes.LANGUAGE_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return currentLanguage;
};

export const SupportedLanguages = Object.keys(LANGUAGES)
	.map(code => ({code, name: LANGUAGES[code].$$settings.name}))
	.sort((n1, n2) => n1.name.toLowerCase().localeCompare(n2.name.toLowerCase()));
export const getCurrentLanguageCode = () => currentLanguage.$$settings.code;
export const getCurrentLanguage = () => currentLanguage;
export const Lang: LanguageObjectType = KeyProxy;

