import React, { useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { bookActions } from '../../../store'
import { RootState } from '../../../store'
import { Authors } from '../../../data/mockData'

const UpdateBookModal = (props: { exit: () => void; isbn: string }) => {
  const dispatch = useDispatch()
  const book = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === props.isbn)
  )
  const selectedBook = book
  const initialInputState = {
    title: '',
    description: '',
    ISBN: '',
    publisher: '',
    authors: ''
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
    // const authors = inputState.authors.split(',')
    console.log(inputState)
    dispatch(bookActions.updateBookInfo({ isbn: props.isbn, inputState: inputState }))
    props.exit()
  }
  console.log(Authors)
  return (
    <div>
      <div>
        <label>ISBN</label>
        <input
          name="ISBN"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={selectedBook[0].ISBN}></input>
      </div>
      <div>
        <label>title</label>
        <input
          name="title"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={selectedBook[0].title}></input>
      </div>
      <div>
        <label>description</label>
        <input
          name="description"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={selectedBook[0].description}></input>
      </div>
      <div>
        <label>publisher</label>
        <input
          name="publisher"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          defaultValue={selectedBook[0].publisher}></input>
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
        {/* <input
          name="authors"
          onChange={(e) => textChangeHandler(e)}
          type="text"
          placeholder={selectedBook[0].authors.toString()}></input> */}
      </div>
      <button onClick={exitModal}>cancel</button>
      <button onClick={onUpdateBookHandler}>update</button>
    </div>
  )
}
export default UpdateBookModal
