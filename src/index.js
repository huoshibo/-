import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';



import App from './App/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
