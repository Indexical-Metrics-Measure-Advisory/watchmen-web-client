import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

const style = 'color:rgba(94,119,171,0.9);';
console.info(`%c
 ██       ██             ██           ██                                     ██       ██         ██          ██████   ██ ██                    ██  
░██      ░██            ░██          ░██                                    ░██      ░██        ░██         ██░░░░██ ░██░░                    ░██  
░██   █  ░██  ██████   ██████  █████ ░██      ██████████   █████  ███████   ░██   █  ░██  █████ ░██        ██    ░░  ░██ ██  █████  ███████  ██████
░██  ███ ░██ ░░░░░░██ ░░░██░  ██░░░██░██████ ░░██░░██░░██ ██░░░██░░██░░░██  ░██  ███ ░██ ██░░░██░██████   ░██        ░██░██ ██░░░██░░██░░░██░░░██░ 
░██ ██░██░██  ███████   ░██  ░██  ░░ ░██░░░██ ░██ ░██ ░██░███████ ░██  ░██  ░██ ██░██░██░███████░██░░░██  ░██        ░██░██░███████ ░██  ░██  ░██  
░████ ░░████ ██░░░░██   ░██  ░██   ██░██  ░██ ░██ ░██ ░██░██░░░░  ░██  ░██  ░████ ░░████░██░░░░ ░██  ░██  ░░██    ██ ░██░██░██░░░░  ░██  ░██  ░██  
░██░   ░░░██░░████████  ░░██ ░░█████ ░██  ░██ ███ ░██ ░██░░██████ ███  ░██  ░██░   ░░░██░░██████░██████    ░░██████  ███░██░░██████ ███  ░██  ░░██ 
░░       ░░  ░░░░░░░░    ░░   ░░░░░  ░░   ░░ ░░░  ░░  ░░  ░░░░░░ ░░░   ░░   ░░       ░░  ░░░░░░ ░░░░░       ░░░░░░  ░░░ ░░  ░░░░░░ ░░░   ░░    ░░  
`, style);
console.info(`%c${process.env.REACT_APP_NAME}%cv${process.env.REACT_APP_VERSION}%cIMMA`,
	`font-variant:petite-caps;font-weight:bold;text-transform:capitalize;color:white;background-color:rgba(94,119,171,0.9);padding:2px 6px;border-top-left-radius:6px;border-bottom-left-radius:6px;`,
	`color:white;font-weight:bold;background-color:rgba(255,161,0,0.9);padding:2px 6px;`,
	`color:white;font-weight:bold;background-color:rgba(205,42,51,0.9);padding:2px 6px;border-top-right-radius:6px;border-bottom-right-radius:6px;`);

ReactDOM.render(
	<StrictMode>
		<App/>
	</StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

