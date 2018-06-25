import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction} from "../actions";
import * as _ from "lodash";

export interface IVoice {
  oscillator: OscillatorNode
}

export interface IVoiceState {
  voices: { [ _: number ]: IVoice },
  context: AudioContext
}

const initialState:IVoiceState = {
  voices: {},
  context: new ((window as any).AudioContext || (window as any).webkitAudioContext)()
}

const newVoice = (context: AudioContext):IVoice => {
  return { oscillator: context.createOscillator() };
}

const audio:Reducer<IVoiceState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    return {...state, voices: {...state.voices, [action.id]: newVoice(state.context) }}
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    return {...state, voices: _.omit(state.voices, action.id)}
  }
  return state
}
​
export { audio }