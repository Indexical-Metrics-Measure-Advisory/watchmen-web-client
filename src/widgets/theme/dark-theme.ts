import DefaultTheme from './default-theme';

const DarkTheme = {
	...DefaultTheme,

	code: 'dark',
	codeEditorTheme: 'vs-dark',

	fontColor: 'rgba(255,255,255,0.8)',
	placeholderColor: 'rgb(255,255,255,0.5)',

	bgColor: '#1D1E21',
	hoverColor: 'rgb(116,127,143)',
	invertColor: '#2E2E32',

	shadow: '0 0 11px 0 rgba(255,255,255, 0.2)',
	hoverShadow: '0 0 11px 0 rgba(255,255,255, 0.4)',

	borderColor: 'rgba(67,71,83,0.8)',

	tooltipBgColor: '#F1F1F1',

	gridRibBgColor: 'rgb(37,37,38)',

	diffAddedBgColor: 'rgba(148,232,191,0.9)'
};

export default DarkTheme;