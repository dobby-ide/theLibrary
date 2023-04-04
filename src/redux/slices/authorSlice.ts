import { createSlice } from '@reduxjs/toolkit'
import { Authors } from '../../data/mockData'

const initialAuthorsState = {
  Authors: Authors
}
export const authorsSlice = createSlice({
  name: 'authors',
  initialState: initialAuthorsState,
  reducers: {
    addAuthor(state, action) {
      const newState = [...state.Authors, action.payload]
      state.Authors = newState
    },
    removeAuthor(state, action) {
      const newState = state.Authors.filter((author) => String(author.name) !== action.payload)
      state.Authors = newState
    },
    updateAuthor(state, action) {
      console.log(action)
      const index = state.Authors.findIndex((obj) => String(obj.name) === action.payload.index)
      let newState = [...state.Authors]
      newState[index].name = action.payload.name
      state.Authors = newState
    }
  }
})
export const authorActions = authorsSlice.actions
