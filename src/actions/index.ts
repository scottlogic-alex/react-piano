import { PianoActionTypes } from './piano'
import { MiscActionTypes } from './misc'

export default {
  PianoActionTypes,
  MiscActionTypes
}





// ActionTypes.ts

enum ActionTyps{
  // pianoish
  Flourish,

  // io
  Despair
}

// IAciton.ts

interface IAction
{
  readonly type: ActionType;
}

// FlourishAction

class FlourishAction implements IAction
{
  public type: IAction = ActionTyps.Despair;

  public static create()
  {
    return
  }

  public static is(action: IAction): action is FlourishAction
  {
    return action.type === ActionTyps.Flourish;
  }
}




FlourishAction.create();