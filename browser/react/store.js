import reducer from './reducers/root-reducer.js'
import { createStore } from 'redux'

 let store = createStore(reducer);

 export default store;