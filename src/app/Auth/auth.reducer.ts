import { createReducer, on } from '@ngrx/store';
import { User } from '../Models/user.model';
import * as auth from './auth.actions';

export interface State {
    user: User;
}

export const initialState: State = {
    user: null,
}

const _authReducer = createReducer(initialState,

    on(auth.setUser, (state,{user}) => ({ ...state, user: {...user}})),
    on(auth.unSetUser, (state) => ({ ...state, user: null})),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}