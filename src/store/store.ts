import { createEvent, createStore } from "effector";
import { UserStore } from '../types/userStore'

export const setNewEmail = createEvent<string>()
export const setNewPassword = createEvent<string>()
export const setErrors = createEvent<[]>()
export const setAccessToken = createEvent<string>()

export default createStore<UserStore>({
    email: '',
    password: '',
    errors: null,
    accessToken: '',
}).on(setNewEmail, (state, email) => ({
    ...state,
    email
})).on(setNewPassword, (state, password) => ({
    ...state,
    password
})).on(setErrors, (state, errors) => ({
    ...state,
    errors
})).on(setAccessToken, (state, accessToken) => ({
    ...state,
    accessToken
}))
