// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit'

import { currentUserSlice } from './redux/slices/currentUserSlice'
import { authorsSlice } from './redux/slices/authorSlice'
import { userSlice } from './redux/slices/userSlice'
import { adminLoginSlice } from './redux/slices/adminLoginSlice'
import { loginSlice } from './redux/slices/userIsLoggedInSlice'
import { booksSlice } from './redux/slices/bookSlice'


export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    adminLogin: adminLoginSlice.reducer,
    book: booksSlice.reducer,
    author: authorsSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
