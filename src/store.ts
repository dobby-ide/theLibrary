import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Users, books, Authors } from './data/mockData'
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
      state.Authors = [...state.Authors, action.payload]
    },
    removeAuthor(state, action) {
      const newState = state.Authors.filter((author) => String(author.name) !== action.payload)
      state.Authors = newState
    },
    updateAuthor(state, action) {
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
      let newState = [...state.Books]
      newState[index].borrowerId = action.payload.userId.id
      newState[index].status = 'not available'
      newState[index].returnDate = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toLocaleDateString()
      state.Books = newState
    },
    returnBook() {},
    updateBookInfo(state, action) {
      const index = state.Books.findIndex((obj) => String(obj.ISBN) === action.payload.isbn)

      state.Books[index] = action.payload.inputState
      state.Books[index].authors = action.payload.authors
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
      console.log(action.payload)
      const newState = [...state.Users]
      let index = state.Users.findIndex((user) => String(user.id) === action.payload.userId.id)
      const t = action.payload.book //[{}]
      newState[index].booksBorrowed.push(t)
      state.Users = newState
    },
    returnBook(state, action) {
      const userEmail = action.payload.user
      const index = state.Users.findIndex((user) => String(user.email) === userEmail)
      const newState = [...state.Users]
      const returnBookIsbn = action.payload.isbn
      const arrayOfBooks = newState[index].booksBorrowed.findIndex(
        (x) => String(x.ISBN) === returnBookIsbn
      )
      newState[index].booksBorrowed.splice(arrayOfBooks)
      state.Users = newState
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
