// import {Action as RAction} from "redux";

export class Action<Payload> {
  private readonly type: string;
  // @ts-ignore
  private readonly payload: Payload; // stub; needed for Is() method's type-inference to work, for some reason
  constructor(payload: Payload) {
    this.type = this.constructor.name;
    // this.payload = payload;
    Object.assign(this, payload);
  }

  public Is<Payload2>(actionType: new(..._:any[])=>Action<Payload2>): this is Payload2 {
    return this.type === actionType.name;
    // return this instanceof actionType; // alternative
  }

  // public static IsType<Payload>(action:RAction<any>, actionType: new(..._:any[])=>RAction): action is Payload {
  //   return action.type == actionType.name;
  // }
}