import {Action, Reducer} from "redux";
import {Action as MyAction} from "../actions/Action";
import {AddVoiceAction, RemoveVoiceAction, StartVoiceAction, StopVoiceAction} from "../actions";
import * as _ from "lodash";

export interface IScaleKey {
  label: string,
  scaleDegree: number,
  frequency: number
}

export interface IImmutablePianoKey {
  label: string,
  frequency: number
}

export interface IPianoKey {
  label: string,
  frequency: number,
  isPlaying: boolean
}

export interface IPianoKeyboardState {
  keys: IPianoKey[]
}

const chromaticDegrees = 12

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
      const scaleKey:IImmutablePianoKey = {
        // scaleDegree,
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
const majorScale:IImmutablePianoKey[] = [...scaleGenerator(majorScaleDegrees, 2)]

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
    const frequency = getFrequency(octave, majorScale.length, scaleKey.frequency)
    const pianoKey:IImmutablePianoKey = {
      label: scaleKey.label,
      // uniqueIx: majorScale.length*octave + scaleKey.scaleDegree,
      frequency
    }
    yield pianoKey
    index++
  }
}

const constructMutableKey = (key:IImmutablePianoKey):IPianoKey => {
  return {
    ...key,
    isPlaying: false
  }
}

const keys:IImmutablePianoKey[] = []
const keyIterator = constructKey()

const generateKeysTo = (limit:number) => {
  for (let i=keys.length; i<limit; i++) {
    keys.push(keyIterator.next().value)
  }
  return keys.slice(0, limit)
}

generateKeysTo(majorScaleLength+1)

const initialState:IPianoKeyboardState = {
  keys: keys.map(constructMutableKey)
}

// initialState.keys = getKeysTo(majorScaleLength+1)

const audio:Reducer<IPianoKeyboardState, Action<any>> = (state = initialState, action:Action<any>) => {
  if (MyAction.IsType(action, AddVoiceAction)) {
    generateKeysTo(state.keys.length + 1)
    return {...state, keys: [...state.keys, constructMutableKey(keys[state.keys.length])] }
  }
  if (MyAction.IsType(action, RemoveVoiceAction)) {
    if (!state.keys.length) {
      return state
    }
    // const removedKey:IPianoKey = state.keys.slice(-1)[0]
    return {...state, keys: state.keys.slice(0, -1)}
  }
  if (MyAction.IsType(action, StartVoiceAction)) {
    return {...state, keys: _.tap([...state.keys], (theKeys:IPianoKey[]) => {
        // @ts-ignore
        theKeys[action.ix].isPlaying = true
        return theKeys
      })}
  }
  if (MyAction.IsType(action, StopVoiceAction)) {
    return {...state, keys: _.tap([...state.keys], (theKeys:IPianoKey[]) => {
        // @ts-ignore
        theKeys[action.ix].isPlaying = false
        return theKeys
      })}
  }
  return state
}
​
export { audio }
