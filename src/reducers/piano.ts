// import {Action as RAction, Reducer} from "redux";
import {Action as RAction, Reducer} from "redux";
import {IncreaseNumberAction} from "../actions";
import {Action} from "../actions/Action";

interface IState {
  number: number
}

const initialState:IState = {
  number: 1
}

const piano:Reducer<IState, RAction<any>> = (state = initialState, action:RAction<any>) => {
  // if (action.Is(IncreaseNumberAction)) {
  if (Action.IsType(action, IncreaseNumberAction)) {
    return {...state, number: state.number + action.amount}
  }
  return state
}
​
export default piano