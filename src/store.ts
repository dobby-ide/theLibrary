// @ts-nocheck
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Users, books, Authors } from './data/mockData'
import Author from './model/author'
import Book from './model/book'
const userIsLoggedIn = {
  isLoggedIn: false
}
const adminIsLoggedIn = {
  isLoggedIn: false
}
const initialUsersState = {
  Users: Users
}
const initialBooksState = {
  Books: books,
  currentBook: {}
}
const initialAuthorsState = {
  Authors: Authors
}
const initialUserLogin = {
  currentUserName: '',
  currentUserEmail: ''
}
const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialUserLogin,
  reducers: {
    saveUser(state, action) {
      state.currentUserName = action.payload.name
      state.currentUserEmail = action.payload.email
    },
    logout(state) {
      state.currentUserName = ''
      state.currentUserEmail = ''
    }
  }
})
const authorsSlice = createSlice({
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
const booksSlice = createSlice({
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
      const index = state.Books.findIndex((obj) => String(obj.ISBN) === action.payload.isbn)
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
export const currentUserActions = currentUserSlice.actions
export const authorActions = authorsSlice.actions
export const bookActions = booksSlice.actions
export const userLoginActions = loginSlice.actions
export const adminLoginActions = adminLoginSlice.actions
export const userActions = userSlice.actions
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
