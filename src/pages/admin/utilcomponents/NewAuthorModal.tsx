// @ts-nocheck
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authorActions, RootState } from '../../../store'
import Author from '../../../model/author'

const NewAuthorModal = ({ closeModal }) => {
  const author = useSelector((state: RootState) => state.author.Authors)
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState('')

  const onSubmitNewAuthor = (e) => {
    e.preventDefault()
    dispatch(authorActions.addAuthor(new Author(inputName)))
    closeModal()
  }

  const closingModalHandler = (e) => {
    e.preventDefault()
    closeModal()
  }

  const textChangeHandler = (e) => {
    setInputName(e.target.value)
  }

  return (
    <div>
      <button onClick={closingModalHandler}>X</button>
      <div>
        <label>name and surname</label>
        <input type="text" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <button onClick={onSubmitNewAuthor}>OK</button>
    </div>
  )
}
export default NewAuthorModal
