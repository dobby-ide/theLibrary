import { createSlice } from '@reduxjs/toolkit'

const initialUserLogin = {
  currentUserName: '',
  currentUserEmail: '',
  currentUserId: '',
  currentUserBooks: ''
}
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialUserLogin,
  reducers: {
    saveUser(state, action) {
      state.currentUserName = action.payload.name
      state.currentUserEmail = action.payload.email
      state.currentUserId = action.payload.id
      state.currentUserBooks = action.payload.numberOfBooks
    },
    returnCurrentUserBook(state, action) {
      state.currentUserBooks = action.payload.numberOfBooks

      console.log(state.currentUserBooks)
    },
    logout(state) {
      state.currentUserName = ''
      state.currentUserEmail = ''
      state.currentUserId = ''
      state.currentUserBooks = ''
    }
  }
})
export const currentUserActions = currentUserSlice.actions
