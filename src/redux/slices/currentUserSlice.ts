import { createSlice } from '@reduxjs/toolkit'

const initialUserLogin = {
  currentUserName: '',
  currentUserEmail: ''
}
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialUserLogin,
  reducers: {
    saveUser(state, action) {
      state.currentUserName = action.payload.name
      state.currentUserEmail = action.payload.email
    },
    logout(state) {
      state.currentUserName = ''
      state.currentUserEmail = ''
    }
  }
})
export const currentUserActions = currentUserSlice.actions
