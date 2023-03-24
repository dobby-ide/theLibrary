import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions } from '../../../store'
import { RootState } from '../../../store'

const UpdateBookModal: React.FC = ({ exit, isbn }) => {
  const dispatch = useDispatch()
  const book = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === isbn)
  )
  const selectedBook = book
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
  const [inputState, inputDispatch] = useReducer(inputStateReducer, initialInputState)
  const textChangeHandler = (e) => {
    inputDispatch({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    })
  }
  const exitModal = () => {
    exit()
  }
  const onUpdateBookHandler = () => {
    const authors = inputState.authors.split(',')

    dispatch(bookActions.updateBookInfo({ isbn: isbn, inputState: inputState, authors: authors }))
    exit()
  }
  console.log(inputState)
  return (
    <div>
      <div>
        <label>ISBN</label>
        <input
          name="ISBN"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].ISBN}></input>
      </div>
      <div>
        <label>title</label>
        <input
          name="title"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].title}></input>
      </div>
      <div>
        <label>description</label>
        <input
          name="description"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].description}></input>
      </div>
      <div>
        <label>publisher</label>
        <input
          name="publisher"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].publisher}></input>
      </div>
      <div>
        <label>authors</label>
        <input
          name="authors"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].authors.toString()}></input>
      </div>
      <button onClick={exitModal}>cancel</button>
      <button onClick={onUpdateBookHandler}>update</button>
    </div>
  )
}
export default UpdateBookModal
