// @ts-nocheck
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import { bookActions } from '../../../store'
import Book from '../../../model/book'
import { Authors } from '../../../data/mockData'
import classes from '../styling/NewBookModal.module.scss'
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

  const textChangeHandler = (e) => {
    inputDispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const onSubmitNewBookHandler = () => {
    dispatch(
      bookActions.addNewBook(
        new Book(
          inputState.ISBN,
          inputState.title,
          inputState.description,
          inputState.publisher,
          [new Author(inputState.authors)],
          inputState.year
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
        <label>year</label>
        <input type="text" name="year" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <div>
        <label>authors</label>
        <select name="authors" onChange={(e) => textChangeHandler(e)}>
          <option defaultValue=""></option>
          {Authors.map((author) => {
            return (
              <option key={author.name} value={author.name}>
                {author.name}
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
