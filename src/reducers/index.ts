import { combineReducers } from 'redux'
import { piano, IPianoState }  from "./piano"
​
export default combineReducers({
    piano
})

export interface IState {
  piano: IPianoState
}