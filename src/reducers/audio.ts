import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction} from "../actions";
import * as _ from "lodash";

export interface IVoice {
  oscillator: OscillatorNode
}

// export interface IChromaticKey {
//   chromaticDegree: number,
//   chromaticIndex: number,
//   frequency: number
// }

export interface IScaleKey {
  label: string,
  scaleDegree: number,
  frequency: number
}

export interface IPianoKey {
  label: string,
  uniqueIx: number,
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

// /**
//  * equal temperament
//  * @param index
//  */
// const calculateFrequency = (index:number) => {
//   const octave = Math.floor(index/chromaticDegrees)
//   const relativeFreq = (2**(1/chromaticDegrees))**index
//   // C above concert A, equal temperament
//   // 440*(2^(1/12))^3
//   const base = 523.25
//   // console.debug(octave, relativeFreq, base)
//   return 2**octave*base*relativeFreq
// }

const calculateRelativeFrequencyChromatic = (index: number) => (2**(1/chromaticDegrees))**index

const constructChromaticKey = (index:number) => {
  return {
    chromaticDegree: index % chromaticDegrees,
    frequency: calculateRelativeFrequencyChromatic(index)
  }
}

function* chromaticsGenerator() {
  let index = 0;
  while(true) {
    yield constructChromaticKey(index++);
  }
}

function* scaleGenerator(chromaticsInScale:boolean[], labelOffset:number) {
  const scaleLength = chromaticsInScale.filter(_.identity).length
  let scaleDegree = 0
  for (const chromatic of chromaticsGenerator()) {
    if (chromaticsInScale[chromatic.chromaticDegree % chromaticsInScale.length]) {
      const scaleKey:IScaleKey = {
        scaleDegree,
        frequency: chromatic.frequency,
        label: String.fromCharCode(65 + ((scaleDegree + labelOffset) % scaleLength))
      }
      yield scaleKey;
      if (++scaleDegree >= scaleLength) {
        return
      }
    }
  }
}

const majorScaleDegrees = [true, false, true, false, true, true, false, true, false, true, false, true]
const majorScaleLength = majorScaleDegrees.filter(_.identity).length
const majorScale:IScaleKey[] = [...scaleGenerator(majorScaleDegrees, 2)]

// const constructPianoKey = (chromaticKey: IChromaticKey, index:number) => {
//   const labelOffset:number = 2;
//   return {
//     ...chromaticKey,
//     scaleDegree: index % majorScale.length,
//     label: String.fromCharCode(65 + ((index + labelOffset) % majorScale.length)),
//     voice: newVoice(globalAudioContext, chromaticKey.frequency)
//   }
// }

const getFrequency = (octave: number, scaleLength:number, relativeFrequency:number) => {
  // C above concert A, equal temperament
  // 440*(2^(1/12))^3
  const base = 523.25
  // console.debug(octave, relativeFreq, base)
  return 2**octave*base*relativeFrequency
}

function* constructKey() {
  let index = 0;
  while(true) {
    const scaleKey = majorScale[index % majorScale.length]
    const octave = Math.floor(index/majorScale.length)
    const pianoKey:IPianoKey = {
      label: scaleKey.label,
      uniqueIx: majorScale.length*octave + scaleKey.scaleDegree,
      voice: newVoice(globalAudioContext, getFrequency(octave, majorScale.length, scaleKey.frequency))
    }
    yield pianoKey
    index++
  }
}

// const majorScale:IPianoKey[] = []
// const majorScaleIterator = scaleGenerator(majorScaleDegrees)

const keys:IPianoKey[] = []
const keyIterator = constructKey()

const getKeysTo = (limit:number) => {
  for (let i=keys.length; i<limit; i++) {
    keys.push(keyIterator.next().value)
  }
  return keys.slice(0, limit)
}

// const constructMajorScale = () => (_.times(majorScale.length+1,
//     // @ts-ignore
//     scaleGenerator(majorScale)) as IChromaticKey[])
//     .map(constructPianoKey)

const initialState:IPianoKeyboardState = {
  context: globalAudioContext,
  keys: getKeysTo(majorScaleLength+1)
}

const audio:Reducer<IPianoKeyboardState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    return {...state, keys: getKeysTo(state.keys.length + 1) }
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    if (!state.keys.length) {
      return state
    }
    // const removedKey:IPianoKey = state.keys.slice(-1)[0]
    // removedKey.voice.oscillator.stop()
    return {...state, keys: getKeysTo(state.keys.length - 1)}
  }
  return state
}
​
export { audio }
