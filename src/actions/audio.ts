import {Action} from "./Action";

export class AddVoiceAction extends Action<{}> {}
export class RemoveVoiceAction extends Action<{}> {}
export class StartVoiceAction extends Action<{ix:number}> {}
export class StopVoiceAction extends Action<{ix:number}> {}