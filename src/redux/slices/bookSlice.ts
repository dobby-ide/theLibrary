// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'
import { books } from '../../data/mockData'
import Author from '../../model/author'
import Book from '../../model/book'

const initialBooksState = {
  Books: books,
  currentBook: {}
}

export const booksSlice = createSlice({
  name: 'books',
  initialState: initialBooksState,
  reducers: {
    addNewBook(state, action) {
      state.Books = [...state.Books, action.payload]
    },
    borrowBook(state, action) {
      console.log(action)
      const index = state.Books.findIndex((obj) => String(obj.ISBN) === action.payload.isbn)
      const newState = [...state.Books]
      newState[index].borrowerId = action.payload.userId.id
      newState[index].status = 'not available'
      newState[index].returnDate = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toLocaleDateString()
      state.Books = newState
    },
    returnBook(state, action) {
      const index = state.Books.findIndex((obj) => String(obj.ISBN) === String(action.payload.isbn))
      state.Books[index].status = 'Available'
      state.Books[index].returnDate = ''
      console.log(state.Books[index])
    },
    updateBookInfo(state, action) {
      console.log(action.payload)
      const index = state.Books.findIndex((obj) => String(obj.ISBN) === String(action.payload.isbn))
      const newData = action.payload.inputState
      const newAuthor = new Author(action.payload.inputState.authors)
      const updateBook = new Book(
        newData.ISBN,
        newData.title,
        newData.description,
        newData.publisher,
        [newAuthor],
        newData.category
      )
      state.Books[index] = updateBook
    },
    removeBook(state, action) {
      const newState = state.Books.filter((book) => String(book.ISBN) !== action.payload)
      state.Books = newState
    }
  }
})

export const bookActions = booksSlice.actions
