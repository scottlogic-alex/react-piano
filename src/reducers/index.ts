import { combineReducers } from 'redux'
import { piano, IPianoState }  from "./piano"
import {audio, IPianoKeyboardState} from "./audio";

​
export default combineReducers({
  piano,
  audio
})

export interface IState {
  piano: IPianoState,
  audio: IPianoKeyboardState
}