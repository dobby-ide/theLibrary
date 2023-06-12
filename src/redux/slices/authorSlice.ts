// @ts-nocheck
import url from '../../apiurl'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = url

const initialAuthorsState = {
  Authors: []
}

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.get(url)
  return response.data
})

export const deleteAuthor = createAsyncThunk('authors/deleteAuthor', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.delete(url)
  console.log(response)
  return response.status
})

export const updateAuthorToServer = createAsyncThunk(
  'authors/updateAuthor',
  async ({ endpoint, updatedAuthor }) => {
    const url = `${apiUrl}/${endpoint}`
    const response = await axios.put(url, updatedAuthor, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.status
  }
)

export const addAuthorToServer = createAsyncThunk(
  'authors/addAuthor',
  async ({ endpoint, newAuthor }) => {
    const url = `${apiUrl}/${endpoint}`
    const response = await axios.post(url, newAuthor, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  }
)

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: initialAuthorsState,
  reducers: {
    addAuthor(state, action) {
      const newState = [...state.Authors, action.payload]
      state.Authors = newState
    },
    removeAuthor(state, action) {
      const newState = state.Authors.filter((author) => String(author.id) !== action.payload)
      state.Authors = newState
    },
    updateAuthor(state, action) {
      const index = state.Authors.findIndex((obj) => String(obj.id) === action.payload.index)
      let newState = [...state.Authors]
      newState[index].authorName = action.payload.name
      state.Authors = newState
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.Authors = action.payload
        state.status = 'succeded'
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export const authorActions = {
  ...authorsSlice.actions,
  fetchAuthors,
  deleteAuthor,
  updateAuthorToServer,
  addAuthorToServer
}
