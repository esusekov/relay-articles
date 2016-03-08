import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    serverData: () => Relay.QL`
      query {
        app
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
