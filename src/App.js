import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigator from './utils/ComponentNavigator';
import Home from './screens/Home';

const App = () => {
  if (!__DEV__) {
    console.log = () => {};
  }

  const s = store();

  return (
    <Provider store={s}>
      <Navigator initialComponent={Home} />
    </Provider>
  );
};

export default App;
