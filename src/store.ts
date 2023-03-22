import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Users } from './data/mockData'
const userIsLoggedIn = {
  isLoggedIn: false
}
const adminIsLoggedIn = {
  isLoggedIn: false
}
const initialUsersState = {
  Users: Users
}
const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState: adminIsLoggedIn,
  reducers: {
    loginAccepted(state) {
      state.isLoggedIn = !state.isLoggedIn
    }
  }
})
const loginSlice = createSlice({
  name: 'login',
  initialState: userIsLoggedIn,
  reducers: {
    loginAccepted(state) {
      state.isLoggedIn = !state.isLoggedIn
    }
  }
})
const userSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    addUser(state, action) {
      state.Users = [...state.Users, action.payload]
    }
  }
})
export const userLoginActions = loginSlice.actions
export const adminLoginActions = adminLoginSlice.actions
export const userActions = userSlice.actions
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    login: loginSlice.reducer,
    adminLogin: adminLoginSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
