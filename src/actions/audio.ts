import {Action} from "./Action";

export class AddVoiceAction extends Action<{id:number}> {}
export class RemoveVoiceAction extends Action<{id:number}> {}