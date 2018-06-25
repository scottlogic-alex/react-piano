import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction} from "../actions";
import * as _ from "lodash";

export interface IVoice {
  oscillator: OscillatorNode
}

export interface IChromaticKey {
  chromaticDegree: number,
  frequency: number
}

export interface IPianoKey {
  label: string,
  scaleDegree: number,
  chromaticDegree: number
  frequency: number,
  voice: IVoice
}

export interface IPianoKeyboard {
  keys: IPianoKey[],
  context: AudioContext
}

const newVoice = (context: AudioContext, frequency:number):IVoice => {
  const osc = context.createOscillator()
  osc.frequency.setValueAtTime(frequency, context.currentTime);
  osc.connect(context.destination);
  return { oscillator: osc };
}

const chromaticDegrees = 12

/**
 * equal temperament
 * @param index
 */
const calculateFrequency = (index:number) => {
  const octave = Math.floor((index)/chromaticDegrees)
  const relativeFreq = (2**(1/chromaticDegrees))**index
  // C above concert A, equal temperament
  // 440*(2^(1/12))^3
  const base = 523.25
  return 2**octave*base*relativeFreq
}

const constructChromaticKey = (index:number):IChromaticKey => {
  return {
    chromaticDegree: index % chromaticDegrees,
    frequency: calculateFrequency(index)
  }
}

function* scaleGenerator(chromaticsInScale:boolean[]) {
  let index = 0;
  while(true) {
    if (chromaticsInScale[index % chromaticsInScale.length]) {
      yield constructChromaticKey(index);
    }
    index++;
  }
}

const majorScale = [true, false, true, false, true, true, false, true, false, true, false, true]

const context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

const constructPianoKey = (chromaticKey: IChromaticKey, index:number) => {
  const labelOffset:number = 2;
  return {
    ...chromaticKey,
    scaleDegree: index % majorScale.length,
    label: String.fromCharCode(65 + ((index + labelOffset) % majorScale.length)),
    voice: newVoice(context, chromaticKey.frequency)
  }
}

const constructMajorScale = () => (_.times(majorScale.length+1,
    // @ts-ignore
    scaleGenerator(majorScale)) as IChromaticKey[])
    .map(constructPianoKey)

const initialState:IPianoKeyboard = {
  context,
  keys: constructMajorScale()
}

const audio:Reducer<IPianoKeyboard, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    return {...state, keys: [...state.keys, constructPianoKey(constructChromaticKey(action.id), action.id) ]}
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    return {...state, keys: _.filter(state.keys, (_, index:number) => action.id !== index)}
  }
  return state
}
​
export { audio }