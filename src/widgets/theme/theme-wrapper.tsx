import '@/assets/fonts/oswald/oswald.css';
import '@/assets/fonts/source-code-pro/source-code-pro.css';
import {fetchThemeFromSession} from '@/services/data/account/last-snapshot';
import React, {useEffect, useState} from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import DarkTheme from './dark-theme';
import DefaultTheme from './default-theme';
import {Theme} from './types';

const shouldIgnorePixel = (key: string) => ['fontDemiBold', 'fontBold', 'fontBoldest'].includes(key);
const convertToCssVariableName = (key: string) => {
	return '--' + key.split('').map(ch => (ch >= 'A' && ch <= 'Z') ? `-${ch.toLowerCase()}` : ch).join('');
};
const writeThemeProperty = (theme: Theme) => {
	return Object.keys(theme).map(key => {
		const name = convertToCssVariableName(key);
		const value = (theme as any)[key];
		if (typeof value === 'number') {
			if (shouldIgnorePixel(key)) {
				return `${name}: ${value};`;
			} else {
				return `${name}: ${value}px;`;
			}
		} else {
			return `${name}: ${value};`;
		}
	});
};
const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
	*, *:before, *:after {
		margin     : 0;
		padding    : 0;
		box-sizing : border-box;
	}
	html {
		${({theme}) => writeThemeProperty(theme)}
		width : 100%;
	}
	body {
		margin                  : 0;
		font-family             : var(--font-family);
		font-size               : var(--font-size);
		color                   : var(--font-color);
		-webkit-font-smoothing  : antialiased;
		-moz-osx-font-smoothing : grayscale;
		position                : relative;
		background-color        : var(--bg-color);
		overflow-x              : hidden;
		width                   : 100%;
	}
	a,
	a:visited {
		color : var(--font-color);
	}
	input::placeholder {
		color : var(--placeholder-color);
	}
	code {
		font-family : var(--code-font-family);
	}
	main[data-v-scroll],
	div[data-v-scroll],
	div[data-h-scroll],
	textarea[data-v-scroll],
	textarea[data-h-scroll] {
		&::-webkit-scrollbar {
			background-color : transparent;
		}
		&::-webkit-scrollbar-track {
			background-color : var(--scrollbar-bg-color);
			border-radius    : 2px;
		}
		&::-webkit-scrollbar-thumb {
			background-color : var(--scrollbar-thumb-bg-color);
			border-radius    : 2px;
		}
	}
	div[data-h-scroll],
	textarea[data-h-scroll] {
		&::-webkit-scrollbar {
			height : 8px;
		}
	}
	main[data-v-scroll],
	div[data-v-scroll],
	textarea[data-v-scroll] {
		&::-webkit-scrollbar {
			width : 4px;
		}
	}
`;

const THEMES: Record<string, Theme> = {
	[DarkTheme.code]: DarkTheme,
	[DefaultTheme.code]: DefaultTheme
};

const findTheme = (themeCode: string) => {
	return THEMES[themeCode] || DefaultTheme;
};

let currentTheme = findTheme(fetchThemeFromSession() || DefaultTheme.code);
export const getCurrentTheme = () => currentTheme;
export const getCurrentThemeCode = () => currentTheme.code;

export const ThemeWrapper = () => {
	const [theme, setTheme] = useState(currentTheme);

	const {on, off} = useEventBus();
	useEffect(() => {
		const onThemeChange = (themeName: string) => {
			const theme = THEMES[themeName];
			if (theme) {
				currentTheme = theme;
				setTheme(theme);
			} else {
				console.warn(`Theme[${themeName}] is not supported yet.`);
			}
		};
		on(EventTypes.CHANGE_THEME, onThemeChange);
		return () => {
			off(EventTypes.CHANGE_THEME, onThemeChange);
		};
	}, [on, off]);

	return <ThemeProvider theme={theme}>
		<GlobalStyle/>
	</ThemeProvider>;
};