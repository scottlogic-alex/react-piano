// import {Action as RAction} from "redux";

import {AnyAction} from "redux";

export class Action<Payload> implements AnyAction{

  public static IsType<Payload>(action:any, actionType: new(..._:any[])=>Action<Payload>): action is Payload {
    return action.type === actionType.name;
  }

  // @ts-ignore
  public readonly type: string;
  // @ts-ignore
  private readonly payload: Payload; // stub; needed for Is() method's type-inference to work, for some reason
  constructor(payload: Payload) {
    // @ts-ignore
    this.type = this.constructor.name;
    // this.payload = payload;
    Object.assign(this, payload);
  }

  public Is<Payload2>(actionType: new(..._:any[])=>Action<Payload2>): this is Payload2 {
    return this.type === actionType.name;
    // return this instanceof actionType; // alternative
  }
}