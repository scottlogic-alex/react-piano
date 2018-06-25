import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction} from "../actions";
import * as _ from "lodash";

export interface IVoice {
  oscillator: OscillatorNode
}

export interface IChromaticKey {
  chromaticDegree: number,
  chromaticIndex: number,
  frequency: number
}

export interface IPianoKey extends IChromaticKey {
  label: string,
  scaleDegree: number,
  voice: IVoice
}

const globalAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)()

export interface IPianoKeyboardState {
  keys: IPianoKey[],
  context: AudioContext
}

const newVoice = (audioContext: AudioContext, frequency:number):IVoice => {
  const osc = audioContext.createOscillator()

  console.debug(frequency)
  osc.frequency.setValueAtTime(3000, audioContext.currentTime);
  // osc.frequency.value = frequency
  osc.connect(audioContext.destination);
  return { oscillator: osc };
}

const chromaticDegrees = 12

/**
 * equal temperament
 * @param index
 */
const calculateFrequency = (index:number) => {
  const octave = Math.floor(index/chromaticDegrees)
  const relativeFreq = (2**(1/chromaticDegrees))**index
  // C above concert A, equal temperament
  // 440*(2^(1/12))^3
  const base = 523.25
  // console.debug(octave, relativeFreq, base)
  return 2**octave*base*relativeFreq
}

const constructChromaticKey = (index:number):IChromaticKey => {
  return {
    chromaticIndex: chromaticDegrees,
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

const constructPianoKey = (chromaticKey: IChromaticKey, index:number) => {
  const labelOffset:number = 2;
  return {
    ...chromaticKey,
    scaleDegree: index % majorScale.length,
    label: String.fromCharCode(65 + ((index + labelOffset) % majorScale.length)),
    voice: newVoice(globalAudioContext, chromaticKey.frequency)
  }
}

// function* constructMajorKey() {
//   yield
// }

const constructMajorScale = () => (_.times(majorScale.length+1,
    // @ts-ignore
    scaleGenerator(majorScale)) as IChromaticKey[])
    .map(constructPianoKey)

const initialState:IPianoKeyboardState = {
  context: globalAudioContext,
  keys: constructMajorScale()
}

const audio:Reducer<IPianoKeyboardState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    return {...state, keys: [...state.keys, constructPianoKey(constructChromaticKey(state.keys.length), state.keys.length) ]}
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    return {...state, keys: state.keys.slice(0, -1)}
  }
  return state
}
​
export { audio }