import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import Home from './screens/Home';

const App = () => {
  if (!__DEV__) {
    console.log = () => {};
  }
  return (
    <Provider store={store()}>
      <Home />
    </Provider>
  );
};

export default App;
