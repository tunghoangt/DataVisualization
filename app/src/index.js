import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import BarChartApp from './BarChartApp';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BarChartApp />, document.getElementById('root'));
=======
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

/**
  * http://thecodebarbarian.com/async-await-with-react-and-redux-thunk
  * https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/reducers.md
  * https://redux.js.org/advanced/async-actions
  * https://redux.js.org/advanced/example-reddit-api
  * https://redux.js.org/advanced/middleware
  * https://codebrahma.com/structuring-async-operations-react-redux-applications/
  * https://putridparrot.com/blog/promises-within-your-redux-code/
  * https://react-redux.js.org/using-react-redux/connect-mapdispatch
  */
>>>>>>> master

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
