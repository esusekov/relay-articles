import React from 'react';
import Relay from 'react-relay';

import Article from './../components/Article';
import AppHomeRoute from './../routes/AppHomeRoute';
import ArticleRoute from './../routes/ArticleRoute';

export default class ArticleContainer extends React.Component {
  render() {
    const { articleId } = this.props.params;

    return (
      <Relay.RootContainer
        Component={Article}
        route={new ArticleRoute({ articleId })}
      />
    );
  }
};
