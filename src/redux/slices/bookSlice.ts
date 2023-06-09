// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Author from '../../model/author'
import Book from '../../model/book'

import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8080/api/v1'

const initialBooksState = {
  Books: [],
  currentBook: {}
}

export const updateBookToServer = createAsyncThunk(
  'books/updateBook',
  async ({ endpoint, updatedBook }) => {
    const url = `${apiUrl}/${endpoint}`
    const response = await axios.put(url, updatedBook, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.status
  }
)

export const removeBookFromServer = createAsyncThunk('books/removeBook', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.delete(url)

  return response.data
})

export const addBookToServer = createAsyncThunk('books/addBook', async ({ endpoint, newBook }) => {
  console.log('addBookToServer is called')
  const url = `${apiUrl}/${endpoint}/`
  console.log(url)
  const response = await axios.post(url, newBook, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
})

export const fetchBooks = createAsyncThunk('books/fetch', async (endpoint) => {
  const url = `${apiUrl}/${endpoint}`
  const response = await axios.get(url)
  return response.data
})

export const booksSlice = createSlice({
  name: 'books',
  initialState: initialBooksState,
  reducers: {
    addNewBook(state, action) {
      state.Books = [...state.Books, action.payload]
      console.log(state.Books)
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
      const index = state.Books.findIndex((obj) => String(obj.id) === String(action.payload.id))
      const newData = action.payload.inputState
      const newAuthorId = action.payload.inputState.authors
      const newAuthor = state.Books.map((book) => {
        const authorToUpdate = book.authors.find((author) => String(author.id) === newAuthorId)
        if (authorToUpdate) {
          console.log(authorToUpdate.authorName)
          return authorToUpdate.authorName
        }
      })
      console.log(newAuthor)
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
      const newState = state.Books.filter((book) => String(book.id) !== action.payload)
      state.Books = newState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.Books = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const bookActions = {
  ...booksSlice.actions,
  fetchBooks,
  addBookToServer,
  removeBookFromServer
}
