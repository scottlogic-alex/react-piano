// import {Action as RAction, Reducer} from "redux";
import {Reducer} from "redux";
import {IncreaseNumberAction} from "../actions";
// import {Action} from "../actions/Action";

const piano:Reducer = (state = [], action) => {
  if (action.Is(IncreaseNumberAction)) {
    return {...state, number: state.number + action.amount}
  }
  return state
}
​
export default piano