import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import './components/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<React.StrictMode>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</React.StrictMode> , document.getElementById('root'));


serviceWorker.unregister();
