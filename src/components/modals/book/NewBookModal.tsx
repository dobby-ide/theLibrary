// @ts-nocheck
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { bookActions, addBookToServer } from '../../../redux/slices/bookSlice'
import Book from '../../../model/book'

import classes from '../style/NewBookModal.module.scss'
import Author from '../../../model/author'

const initialInputState = {
  title: '',
  description: '',
  ISBN: '',
  publisher: '',
  authors: ''
}

const inputStateReducer = (state, action) => {
  if (action.type === 'HANDLE_INPUT') {
    return {
      ...state,
      [action.field]: action.payload
    }
  }
  return initialInputState
}

const NewBookModal = ({ closeModal }) => {
  const dispatch = useDispatch()
  const [inputState, inputDispatch] = useReducer(inputStateReducer, initialInputState)
  const authors = useSelector((state: RootState) => state.author.Authors)
  const textChangeHandler = (e) => {
    inputDispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const onSubmitNewBookHandler = () => {
    dispatch(
      addBookToServer({
        endpoint: 'api/v1/books',
        newBook: {
          title: inputState.title,
          ISBN: inputState.ISBN,
          description: inputState.description,
          authors: inputState.authors
        }
      })
    )
    dispatch(
      bookActions.addNewBook({
        book: {
          isbn: inputState.ISBN,
          title: inputState.title,
          description: inputState.description,
          publisher: inputState.publisher,
          author: inputState.authors
        }
      })
    )
    closeModal()
  }

  const closingModalHandler = (e) => {
    e.preventDefault()
    closeModal()
  }
  return (
    <div className={classes.newBookModal}>
      <div className={classes.isbn}>
        <label>ISBN</label>
        <input type="text" name="ISBN" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div className={classes.title}>
        <label>Title</label>
        <input type="text" name="title" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div className={classes.description}>
        <label>Description</label>
        <input type="text" name="description" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div className={classes.publisher}>
        <label>Publisher</label>
        <input type="text" name="publisher" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div className={classes.year}>
        <label>Year</label>
        <input type="text" name="year" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div className={classes.authors}>
        <label>Authors</label>
        <select name="authors" onChange={(e) => textChangeHandler(e)}>
          <option defaultValue=""></option>
          {authors.map((author) => {
            return (
              <option key={author.authorName} value={author.id}>
                {author.authorName}
              </option>
            )
          })}
        </select>
      </div>
      <button className={classes.ok_button} onClick={onSubmitNewBookHandler}>
        OK
      </button>
    </div>
  )
}
export default NewBookModal
