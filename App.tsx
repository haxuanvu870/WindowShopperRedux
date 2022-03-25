import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import { Provider } from 'react-redux'
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}