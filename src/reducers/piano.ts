import {Action, Reducer} from "redux";
import {IncreaseNumberAction} from "../actions";
import {Action as MyAction} from "../actions/Action";

interface IState {
  number: number
}

const initialState:IState = {
  number: 1
}

const piano:Reducer<IState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, IncreaseNumberAction)) {
    return {...state, number: state.number + action.amount}
  }
  return state
}
​
export default piano