import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction} from "../actions";

export interface IVoice {
  oscillator: OscillatorType
}

export interface IVoiceState {
  voices: { [ _: number ]: IVoice },
  context: AudioContext
}

const initialState:IVoiceState = {
  voices: {},
  context: new ((window as any).AudioContext || (window as any).webkitAudioContext)()
}

const audio:Reducer<IVoiceState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    return {...state}
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    return {...state}
  }
  return state
}
​
export { audio }