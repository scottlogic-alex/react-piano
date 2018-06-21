import {Action, Reducer} from "redux";
import {IncreaseNumberAction} from "../actions";
import {Action as MyAction} from "../actions/Action";

export interface IPianoState {
  number: number
}

const initialState:IPianoState = {
  number: 8
}

const piano:Reducer<IPianoState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, IncreaseNumberAction)) {
    return {...state, number: state.number + action.amount}
  }
  return state
}
​
export { piano }