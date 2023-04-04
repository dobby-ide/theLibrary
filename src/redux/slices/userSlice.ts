import { createSlice } from '@reduxjs/toolkit'
import { Users } from '../../data/mockData'
const initialUsersState = {
  Users: Users
}
export const userSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    addUser(state, action) {
      state.Users = [...state.Users, action.payload]
    },
    cart(state, action) {
      const newState = state.Users

      let index = state.Users.findIndex((user) => String(user.id) === action.payload.userId.id)
      console.log(newState[index])
      let finalObj = {}
      const t = action.payload.book //[{}]
      for (let i = 0; i < t.length; i++) {
        Object.assign(finalObj, t[i])
      }
      newState[index].booksBorrowed.push(finalObj)
      state.Users = newState
    },
    returnBook(state, action) {
      const userEmail = action.payload.user
      const index = state.Users.findIndex((user) => String(user.email) === userEmail)
      const newState = state.Users
      const returnBookIsbn = action.payload.isbn
      let bookIndex = newState[index].booksBorrowed.findIndex(
        (bookIndex) => String(bookIndex.ISBN) === returnBookIsbn
      )
      newState[index].booksBorrowed.splice(bookIndex, 1)
      console.log(newState[index].booksBorrowed)
    }
  }
})
export const userActions = userSlice.actions
