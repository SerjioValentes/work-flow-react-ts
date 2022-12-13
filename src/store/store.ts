import { createEvent, createStore } from "effector";
import { UserStore } from '../types/userStore'

export const setNewEmail = createEvent<string>()
export const setNewPassword = createEvent<string>()

export default createStore<UserStore>({
    email: '',
    password: ''
}).on(setNewEmail, (state, email) => ({
    ...state,
    email
})).on(setNewPassword, (state, password) => ({
    ...state,
    password
}))
