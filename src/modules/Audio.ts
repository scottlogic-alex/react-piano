import {IPianoKey} from "../reducers/audio";

interface IKeyState {
  oscillator: OscillatorNode,
  frequency: number,
  isPlaying: boolean
}


export default class Audio {

  private readonly internalKeys:IKeyState[] = []
  private readonly audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)()

  public handleChange(externalKeys: IPianoKey[]) {
    for(let i = this.internalKeys.length; i < externalKeys.length; i++) {
      this.addKey(externalKeys[i])
    }
    for(let i = this.internalKeys.length-1; i > externalKeys.length-1; i--) {
      this.removeKey()
    }
    for (let i = 0; i < this.internalKeys.length; i++) {
      this.reconcileDifferences(externalKeys[i], this.internalKeys[i])
    }
  }

  private constructOscillator (frequency:number):OscillatorNode {
    const osc = this.audioContext.createOscillator()

    // console.debug(frequency)
    osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    // osc.frequency.value = frequency
    return osc;
  }

  private addKey(externalKey: IPianoKey):void {
    const key = this.constructKey(externalKey)
    key.oscillator.connect(this.audioContext.destination);
    this.internalKeys.push(key)
  }

  private constructKey(externalKey: IPianoKey):IKeyState {
    return {
      frequency: externalKey.frequency,
      oscillator: this.constructOscillator(externalKey.frequency),
      isPlaying: false
    }
  }

  private removeKey():void {
    const removedKey = this.internalKeys.pop()
    removedKey!.oscillator.disconnect()
  }

  private reconcileDifferences(externalKey: IPianoKey, internalKey: IKeyState):void {
    this.reconcileIsPlaying(externalKey.isPlaying, internalKey)
  }

  private reconcileIsPlaying(isPlaying: boolean, internalKey: IKeyState):void {
    if (isPlaying === internalKey.isPlaying) {
      return
    }
    if (isPlaying) {
      this.startPlaying(internalKey)
      return
    }
    this.stopPlaying(internalKey)
  }

  private stopPlaying(internalKey: IKeyState):void {
    internalKey.oscillator.stop()
    internalKey.oscillator.disconnect()

    // a stopped oscillator can never be started again, so we must build a new, unstarted one
    internalKey.oscillator = this.constructOscillator(internalKey.frequency)
    internalKey.oscillator.connect(this.audioContext.destination);

    internalKey.isPlaying = false
  }

  private startPlaying(internalKey: IKeyState):void {
    internalKey.oscillator.start()
    internalKey.isPlaying = true
  }
}