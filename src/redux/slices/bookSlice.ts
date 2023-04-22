// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router'
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
    updateAllBooksWithAuthor(state, action) {
      console.log(action.payload.oldAuthor)

      const updateAuthorName = state.Books.map((book) => {
        const authorToUpdate = book.authors.find(
          (author) => author.name === action.payload.oldAuthor
        )
        if (authorToUpdate) {
          return {
            ...book,
            authors: book.authors.map((author) => {
              if (author === authorToUpdate) {
                return { ...author, name: action.payload.newAuthor }
              }
              return author
            })
          }
        }
        return book
      })

      console.log(updateAuthorName)
      state.Books = updateAuthorName
    },
    removeBook(state, action) {
      const newState = state.Books.filter((book) => String(book.ISBN) !== action.payload)
      state.Books = newState
    }
  }
})

export const bookActions = booksSlice.actions
