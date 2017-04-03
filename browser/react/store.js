// import reducer from './reducers/root-reducer.js'
import lyricsReducer from './reducers/lyrics-reducer.js'
import playerReducer from './reducers/player-reducer.js'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


let reducers=combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
});

 let store = createStore(reducers,applyMiddleware(createLogger(),thunkMiddleware));

 export default store;
