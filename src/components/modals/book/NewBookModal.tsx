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
      <div>
        <label>ISBN</label>
        <input type="text" name="ISBN" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>title</label>
        <input type="text" name="title" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>description</label>
        <input type="text" name="description" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>publisher</label>
        <input type="text" name="publisher" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>year</label>
        <input type="text" name="year" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>authors</label>
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
      <button onClick={onSubmitNewBookHandler}>OK</button>
    </div>
  )
}
export default NewBookModal
