import React from 'react';
import Relay from 'react-relay';

import App from './../components/App';
import AppHomeRoute from './../routes/AppHomeRoute';

export default function AppContainer() {
  return (
    <Relay.RootContainer
      Component={App}
      route={new AppHomeRoute()}
    />
  );
}
