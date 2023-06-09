// @ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8080/api/v1'

const initialUsersState = {
  Users: []
}

export const borrowBook = createAsyncThunk('user/borrowBook', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.post(url)
  console.log(response.data)
  return response.data
})

export const returnBook = createAsyncThunk('user/returnBook', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.post(url)
  return response.data
})

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.get(url)
  console.log(response.data)
  return response.data
})

export const userSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.Users = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(borrowBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.Users = action.payload
        state.status = 'succeeded'
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(returnBook.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.Users = action.payload
        state.status = 'succeeded'
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const userActions = { ...userSlice.actions, fetchUsers, borrowBook, returnBook }
