import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { IAppState } from '..';
import { SessionAction, SessionActionTypes } from './actions';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}
  

export interface IUserSession {
    user: IUser;
    token: string;
  }
  

export type SessionStateType = {
  session?: IUserSession;
};

export const defaultState: SessionStateType = {
  session: undefined,
};

export const sessionReducer = (
  state: SessionStateType = defaultState,
  action: SessionAction
): SessionStateType => {
  switch (action.type) {
    case SessionActionTypes.UPDATE:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export const sessionMiddlewareFactory = (): Middleware => {
  return (store: MiddlewareAPI<Dispatch, IAppState>) => (next: Dispatch) => (
    action: SessionAction
  ) => {
    return next(action);
  };
};
