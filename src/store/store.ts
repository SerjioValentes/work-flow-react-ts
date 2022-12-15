import { createEvent, createStore } from "effector";
import { UserStore } from '../types/userStore'

export const setNewEmail = createEvent<string>()
export const setNewPassword = createEvent<string>()
export const setErrors = createEvent<[]>()
export const setAccessTokenToStore = createEvent<string | null>()

export default createStore<UserStore>({
    email: '',
    password: '',
    errors: null,
    accessToken: null,
}).on(setNewEmail, (state, email) => ({
    ...state,
    email
})).on(setNewPassword, (state, password) => ({
    ...state,
    password
})).on(setErrors, (state, errors) => ({
    ...state,
    errors
})).on(setAccessTokenToStore, (state, accessToken) => ({
    ...state,
    accessToken
}))
