import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import { bookActions } from '../../../store'
import Book from '../../../model/book'
import classes from './NewBookModal.module.scss'

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

  const textChangeHandler = (e) => {
    inputDispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const onSubmitNewBookHandler = () => {
    const authors = inputState.authors.split(',')
    dispatch(
      bookActions.addNewBook(
        new Book(
          inputState.ISBN,
          inputState.title,
          inputState.description,
          inputState.publisher,
          authors
        )
      )
    )
  }

  const closingModalHandler = (e) => {
    e.preventDefault()
    closeModal()
  }
  console.log(inputState)
  return (
    <div className={classes.newBookModal}>
      <button onClick={closingModalHandler}>X</button>
      <h2>my modal for new book</h2>
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
        <label>authors</label>
        <input
          placeholder="author1, author2, ..."
          type="text"
          name="authors"
          onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <button onClick={onSubmitNewBookHandler}>OK</button>
    </div>
  )
}
export default NewBookModal
