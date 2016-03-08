import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppContainer from './containers/AppContainer';
import ArticleContainer from './containers/ArticleContainer';

import './../styles/main.scss';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const Root = (props) => (
  <div>{props.children}</div>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root}>
        <IndexRoute component={AppContainer} />
        <Route path="article/:articleId" component={ArticleContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
