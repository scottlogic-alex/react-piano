import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import './index.css';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import Audio from "./modules/Audio";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

const audio:Audio = new Audio()

store.subscribe(() => {
  const state = store.getState()
  audio.handleChange(state.audio.keys)
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
