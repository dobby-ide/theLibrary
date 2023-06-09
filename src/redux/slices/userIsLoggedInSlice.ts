import { createSlice } from '@reduxjs/toolkit'

const userIsLoggedIn = {
  isLoggedIn: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: userIsLoggedIn,
  reducers: {
    loginAccepted(state) {
      state.isLoggedIn = !state.isLoggedIn
    }
  }
})
export const userLoginActions = loginSlice.actions
