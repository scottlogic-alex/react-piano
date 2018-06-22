import {Action, Reducer} from "redux";
import {IncreaseKeysAction} from "../actions";
import {Action as MyAction} from "../actions/Action";

export interface IPianoState {
  keyCount: number
}

const initialState:IPianoState = {
  keyCount: 8
}

const piano:Reducer<IPianoState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, IncreaseKeysAction)) {
    return {...state, keyCount: state.keyCount + action.amount}
  }
  return state
}
​
export { piano }