import { IUserSession } from './';

export enum SessionActionTypes {
  UPDATE = 'SESSION_UPDATE',
}

export type SessionUpdateAction = {
  type: SessionActionTypes.UPDATE;
  payload: IUserSession | undefined;
};

export const sessionUpdateAction = (
  session: IUserSession | undefined
): SessionUpdateAction => {
  return {
    type: SessionActionTypes.UPDATE,
    payload: session,
  };
};

export const SessionActions = {
  update: sessionUpdateAction,
};

export type SessionAction = SessionUpdateAction;
