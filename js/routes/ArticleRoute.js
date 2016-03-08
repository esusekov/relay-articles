import Relay from 'react-relay';

export default class extends Relay.Route {
  static paramDefinitions = {
    articleId: {required: true}
  };

  static queries = {
    serverData: () => Relay.QL`
      query {
        fullArticle(id: $articleId)
      }
    `
  };
  static routeName = 'ArticleRoute';
}
