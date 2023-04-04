import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { bookActions } from '../../../redux/slices/bookSlice'
import { RootState } from '../../../store'
import { Authors } from '../../../data/mockData'
import classes from '../style/UpdateBookModal.module.scss'

const UpdateBookModal = (props: { exit: () => void; isbn: {} }) => {
  const dispatch = useDispatch()

  const book = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === props.isbn)
  )

  const initialInputState = {
    title: book[0].title,
    description: book[0].description,
    ISBN: book[0].ISBN,
    publisher: book[0].publisher,
    authors: book[0].authors[0].name
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputStateReducer = (state: any, action: { type: string; field: any; payload: any }) => {
    if (action.type === 'HANDLE_INPUT') {
      return {
        ...state,
        [action.field]: action.payload
      }
    }
    return initialInputState
  }
  const [inputState, inputDispatch] = useReducer(inputStateReducer, initialInputState)

  const textChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    inputDispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const exitModal = () => {
    props.exit()
  }

  const onUpdateBookHandler = () => {
    dispatch(bookActions.updateBookInfo({ isbn: props.isbn, inputState: inputState }))
    props.exit()
  }
  console.log(inputState)
  return (
    <div className={classes.updateBookModal__container}>
      <div>
        <label>ISBN</label>
        <input
          name="ISBN"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          value={inputState.ISBN}></input>
      </div>
      <div>
        <label>title</label>
        <input
          name="title"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={inputState.title}></input>
      </div>
      <div>
        <label>description</label>
        <input
          name="description"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={inputState.description}></input>
      </div>
      <div>
        <label>publisher</label>
        <input
          name="publisher"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          value={inputState.publisher}></input>
      </div>
      <div className={classes.authors}>
        <label>authors</label>
        <select name="authors" onChange={(e) => textChangeHandler(e)}>
          <option value={inputState.authors}>{inputState.authors}</option>
          {Authors.map((author) => {
            return (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            )
          })}
        </select>
      </div>
      <button onClick={exitModal}>cancel</button>
      <button onClick={onUpdateBookHandler}>update</button>
    </div>
  )
}
export default UpdateBookModal
