// import {Action as RAction} from "redux";


export class Action<Payload>{

  public static IsType<Payload>(action:any, actionType: new(..._:any[])=>Action<Payload>): action is Payload {
    return action.type === actionType.name;
  }

  // @ts-ignore
  public readonly type: string;
  // @ts-ignore
  private readonly payload: Payload; // stub; needed for IsType() method's type-inference to work, for some reason
  constructor(payload: Payload) {
    // @ts-ignore
    this.type = this.constructor.name;
    // this.payload = payload;
    Object.assign(this, payload);
  }
}