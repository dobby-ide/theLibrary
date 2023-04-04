import { createSlice } from '@reduxjs/toolkit'

const adminIsLoggedIn = {
  isLoggedIn: false
}
export const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState: adminIsLoggedIn,
  reducers: {
    loginAccepted(state) {
      state.isLoggedIn = !state.isLoggedIn
    }
  }
})

export const adminLoginActions = adminLoginSlice.actions
