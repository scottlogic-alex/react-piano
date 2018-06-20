// import {Action as RAction, Reducer} from "redux";
import {Reducer} from "redux";
import {IncreaseNumberAction} from "../actions";
import {Action} from "../actions/Action";

interface IState {
  number: number
}

const initialState:IState = {
  number: 1
}

const piano:Reducer<IState, Action<any>> = (state = initialState, action:Action<any>) => {
  // if (action.Is(IncreaseNumberAction)) {
  if (Action.IsType(action, IncreaseNumberAction)) {
    return {...state, number: state.number + action.amount}
  }
  return state
}
​
export default piano